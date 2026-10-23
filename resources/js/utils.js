/**
 * Extract the first image from a ProseMirror JSON content structure.
 */
export const findFirstImage = (content) => {
    if (!content) return null;
    
    if (typeof content === 'string') {
        const match = content.match(/<img[^>]+src="([^">]+)"/);
        if (match) return match[1];
        
        try {
            const parsed = JSON.parse(content);
            return findFirstImage(parsed);
        } catch {
            return null;
        }
    }
    
    if (typeof content === 'object') {
        if (content.type === 'image' && content.attrs?.src) return content.attrs.src;
        if (content.content && Array.isArray(content.content)) {
            for (const node of content.content) {
                const found = findFirstImage(node);
                if (found) return found;
            }
        }
    }
    
    return null;
};

/**
 * Detect if an image URL is a publisher logo, badge, avatar, or broken asset.
 */
export const isForbiddenImage = (url) => {
    if (!url) return true;
    const lower = String(url).toLowerCase();
    if (lower.includes('googleusercontent.com') && (lower.includes('=h60') || lower.includes('=s60') || lower.includes('=w100'))) return true;
    if (lower.includes('tc-logo') || lower.includes('techcrunch-logo') || lower.includes('/undefined')) return true;
    if (lower.includes('author') || lower.includes('avatar') || lower.includes('headshot') || lower.includes('favicon')) return true;
    return false;
};

/**
 * Upgrade CDN thumbnail URLs to full high-resolution versions.
 */
export const upgradeImageUrl = (url) => {
    if (!url) return '';
    let upgraded = String(url);

    // Substack CDN: extract original uncompressed S3 URL if encoded
    if (upgraded.includes('substackcdn.com/image/fetch/')) {
        const match = upgraded.match(/https%3A%2F%2F[^\s"\'<>]+/i);
        if (match) {
            try {
                return decodeURIComponent(match[0]);
            } catch {
                // fallback to transform replace
            }
        }
        return upgraded.replace(/w_\d+,h_\d+,c_fill[^\/]*/i, 'w_1456,c_limit,f_auto,q_auto:good');
    }

    // Wired CDN: upgrade 120px to 1600px
    if (upgraded.includes('media.wired.com/photos/')) {
        return upgraded.replace(/w_\d+(?:%2Ch_\d+)?(?:%2Cc_limit|,c_limit)?/i, 'w_1600,c_limit').replace(/1:1/i, '16:9');
    }

    // WordPress thumbnails: photo-150x150.jpg -> photo.jpg
    const wpMatch = upgraded.match(/^(.+)-\d{2,4}x\d{2,4}(\.(?:jpe?g|png|webp))$/i);
    if (wpMatch) {
        return wpMatch[1] + wpMatch[2];
    }

    return upgraded;
};

/**
 * Get the final image URL, falling back to content extraction or generic defaults.
 */
export const getFinalImage = (article, width = 1200) => {
    let url = article.cover_image_path;

    // Discard forbidden logo badges
    if (isForbiddenImage(url)) {
        url = null;
    }

    if (!url) {
        const contentImg = findFirstImage(article.content);
        if (!isForbiddenImage(contentImg)) {
            url = contentImg;
        }
    }

    // Upgrade thumbnail dimensions
    if (url) {
        url = upgradeImageUrl(url);
    }
    
    if (url && !url.startsWith('http') && !url.startsWith('/')) {
        url = '/storage/' + url;
    }
    
    // Topic-aware curated editorial fallbacks
    if (!url) {
        const text = `${article.slug || ''} ${article.title || ''}`.toLowerCase();
        if (text.includes('disney') || text.includes('streaming') || text.includes('hulu') || text.includes('cinema') || text.includes('subscrip')) {
            url = 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37';
        } else if (text.includes('fusion') || text.includes('reactor') || text.includes('plasma') || text.includes('quantum')) {
            url = 'https://images.unsplash.com/photo-1507413245164-6160d8298b31';
        } else if (text.includes('iphone') || text.includes('apple') || text.includes('smartphone') || text.includes('mobile') || text.includes('android')) {
            url = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9';
        } else if (text.includes('semiconductor') || text.includes('chip') || text.includes('gpu') || text.includes('hardware') || text.includes('silicon')) {
            url = 'https://images.unsplash.com/photo-1518770660439-4636190af475';
        } else if (text.includes('security') || text.includes('exploit') || text.includes('hacker') || text.includes('vulnerab') || text.includes('patch')) {
            url = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b';
        } else if (text.includes('ai') || text.includes('model') || text.includes('llm') || text.includes('gpt') || text.includes('gemini') || text.includes('claude')) {
            url = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485';
        } else {
            url = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa';
        }
    }

    // Inject Unsplash optimization parameters if it's an unsplash URL
    if (url.includes('unsplash.com')) {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}auto=format&fit=crop&q=80&w=${width}`;
    }

    // If it's a local storage path without http, prefix it with /storage/
    if (url && !url.startsWith('http')) {
        if (url.startsWith('/storage/')) {
            return url;
        }
        return `/storage/${url}`;
    }

    return url;
};
