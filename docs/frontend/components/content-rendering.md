# Content Rendering Components

These components handle the display of dynamic, user or AI-generated data.

## `RichEditor.jsx`
An implementation of **TipTap** (a headless wrapper around ProseMirror) used in the Dashboard for manual article editing.
- Because TechyNews stores RAW HTML, the TipTap editor is initialized with `article.content`.
- When saved, it exports HTML (`editor.getHTML()`) and sends it back to the server.

## `FactCheckPanel.jsx`
A UI component attached to `ArticleShow.jsx` (usually at the bottom or in a sidebar) that dynamically renders the `FactCheckClaim` rows.
- If an article has been verified, it displays a trusted badge.
- If claims are misleading, it highlights the specific text and provides a link to the Jina Reader evidence URL.
