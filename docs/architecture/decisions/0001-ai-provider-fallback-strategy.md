# ADR 0001: AI Provider Fallback Strategy & Rate Limit Mitigation

**Status:** Accepted
**Date:** 2024-05-20

## 1. Context and Problem
TechyNews relies heavily on AI for automated news aggregation and generation. During peak generation cycles, relying on a single AI provider creates a Single Point of Failure (SPOF). Network timeouts, API outages, or HTTP 429 (Too Many Requests) errors would halt the content pipeline entirely, leaving the platform without fresh content.

We needed a resilient architecture that guarantees high availability for the content generation pipeline without significantly increasing operational costs or exposing API keys on the client side.

## 2. Considered Options
* **Option A: Naive Retry with Exponential Backoff (Single Provider).** Pausing the queue and retrying. (Rejected: Doesn't solve provider-side outages).
* **Option B: Multiple Google Cloud Accounts.** (Rejected: Violates Terms of Service and adds billing complexity).
* **Option C: Provider Fallback Chain (Gemini -> OpenRouter).**

## 3. Decision
We selected **Option C: Implement a Fallback Chain Strategy.**

1. **Primary Provider:** Google Gemini 2.0 Flash is used as the primary LLM due to its exceptional speed-to-cost ratio and large context window.
2. **Secondary Provider (Fallback):** OpenRouter is configured as a fallback proxy. 
3. **Implementation:** If the primary Gemini request fails (e.g., due to rate limits or 5xx errors), the backend Exception Handler intercepts the failure, logs the incident with context, and seamlessly routes the identical prompt to the OpenRouter fallback adapter.
4. **Throttling:** A mandatory 10-second delay was introduced in the content generation queue between successful calls to proactively respect provider rate limits.

## 4. Consequences

### Positive:
* **High Availability:** The content pipeline is now fault-tolerant. Temporary Gemini outages no longer halt platform updates.
* **Cost Efficiency:** We maintain the low cost of Gemini 2.0 Flash for ~95% of operations, only incurring OpenRouter costs during emergency failovers.
* **Security:** All LLM interactions remain strictly server-side, preventing API key leakage.

### Negative / Trade-offs:
* **Architectural Complexity:** Requires maintaining multiple AI service adapters in the Laravel backend to normalize request/response payloads across different APIs.
* **Latency Spikes:** During a failover event, the total request latency increases (Primary Timeout + Fallback Generation Time), though this is acceptable for background queue jobs.
