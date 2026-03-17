# Software Design Document (SDD)

## 1. Introduction
This document outlines the architecture and endpoints for the **Laravel** (Version 0.0.1).

## 2. Base URLs
- `http://localhost/api`

## 3. Endpoints

### `GET /user`
**Responses:**
- **200**: `User`
- **401**: 

---

### `POST /generate-brief`
**Summary**: Synthesize article content into an executive brief

**Payload (application/json):**
- `content` (string)

**Responses:**
- **200**: 
- **422**: 

---

### `POST /generate-seo`
**Summary**: Generate SEO metadata (description and keywords)

**Payload (application/json):**
- `content` (string)

**Responses:**
- **200**: 
- **422**: 

---

### `POST /generate-image-prompt`
**Summary**: Architect a visual prompt for image generation

**Payload (application/json):**
- `content` (string)

**Responses:**
- **200**: 
- **422**: 

---

### `GET /generate-ideas`
**Summary**: Fetch today's news and generate prompt ideas

**Responses:**
- **200**: 

---

### `POST /generate-draft`
**Summary**: Auto-draft a full article based on an idea

**Payload (application/json):**
- `title` (string)
- `prompt` (string)

**Responses:**
- **200**: 
- **422**: 

---

### `POST /editor-action`
**Summary**: Perform specific context-aware actions in the editor

**Payload (application/json):**
- `action` (string)
- `text` (string)

**Responses:**
- **200**: 
- **422**: 

---

### `POST /studio-chat`
**Summary**: Handle multi-turn conversational AI for the Studio

**Payload (application/json):**
- `message` (string)
- `history` (array|null)
- `editor_context` (array|null)

**Responses:**
- **200**: 
- **422**: 

---

### `POST /ask-llama`
**Summary**: Ask Llama for a generic response based on a prompt

**Payload (application/json):**
- `prompt` (string)

**Responses:**
- **200**: 
- **422**: 
- **401**: 

---

### `GET /analytics/dashboard`
**Summary**: Get aggregate analytics data for the dashboard

**Responses:**
- **200**: 

---

### `POST /articles/{id}/like`
**Summary**: Like an article

**Parameters:**
- `id` [path, string] (Required)

**Responses:**
- **200**: 

---

### `GET /search`
**Summary**: Search API for Cmd+K floating palette

**Parameters:**
- `q` [query, string] (Optional)

**Responses:**
- **200**: 

---

