# ArticleShow Page

`ArticleShow.jsx` is responsible for rendering the massive HTML blobs stored in the database.

## Rendering Strategy
Because TechyNews stores articles as raw HTML (to avoid the performance penalty of parsing TipTap/ProseMirror JSON on the client), this page uses `dangerouslySetInnerHTML`.

```jsx
<div 
  className="prose dark:prose-invert max-w-none" 
  dangerouslySetInnerHTML={{ __html: article.content }} 
/>
```

## Hydration Considerations
During SSR (Server-Side Rendering), the HTML sent from the server must exactly match the initial render tree of React 18.
- If a translation is missing and the UI falls back dynamically on the client, it causes a hydration mismatch error. 
- To prevent this, the Laravel controller ensures that if a translation is requested, it is either resolved on the server or the server sends the fallback explicitly, so the client and server trees remain perfectly synchronized.
