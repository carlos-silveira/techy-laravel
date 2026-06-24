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
 * Get the final image URL, falling back to content extraction or generic defaults.
 */
export const getFinalImage = (article, width = 1200) => {
    let url = article.cover_image_path;
    if (!url) {
        url = findFirstImage(article.content);
    }
    
    if (url && !url.startsWith('http') && !url.startsWith('/')) {
        url = '/storage/' + url;
    }
    
    // Generic tech fallbacks based on keywords or slug
    if (!url) {
        url = article.slug && article.slug.includes('not-paid-to-write-code') 
            ? 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
            : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa';
    }

    // Inject Unsplash optimization parameters if it's an unsplash URL
    if (url.includes('unsplash.com')) {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}auto=format&fit=crop&q=80&w=${width}`;
    }

    // If it's a local storage path without http, prefix it with /storage/
    if (url && !url.startsWith('http')) {
        // Prevent double /storage/
        if (url.startsWith('/storage/')) {
            return url;
        }
        return `/storage/${url}`;
    }

    return url;
};
