# Stage 1

## Approach for Maintaining Priority Inbox Efficiently

To maintain the top 'n' most important unread notifications dynamically as new notifications stream in, sorting the entire dataset repeatedly (O(N log N)) is inefficient. Instead, we can utilize a **Min-Heap (Priority Queue)** data structure.

### Algorithm
1. **Priority Score Calculation:** Each notification is assigned a priority score based on:
   - **Type Weight:** Placement (3) > Result (2) > Event (1).
   - **Recency:** Represented by the Unix timestamp of the notification.
2. **Min-Heap Initialization:** We initialize a Min-Heap of size `n` (e.g., 10). The heap orders elements such that the notification with the *lowest* priority score among the top `n` is always at the root.
3. **Processing the Initial Stream:** 
   - Insert the first `n` notifications into the heap.
   - For every subsequent notification, compare its priority score with the root of the heap.
   - If the new notification's score is higher than the root, we pop the root and insert the new notification. This takes O(log n) time.
4. **Handling Continuous Updates:** As new notifications arrive via WebSocket or polling, the same O(log n) comparison and insertion logic applies.
5. **Final Output:** The heap contains the top `n` notifications. We can pop them out and reverse them to get the sorted order (highest priority first).

### Time Complexity
- **Insertion/Update:** O(log n) per new notification.
- **Fetching Top n:** O(n log n) to extract and sort the final heap, but since `n` is very small (e.g., 10 or 20), this is effectively O(1).
- **Overall Time Complexity for N items:** O(N log n), which is significantly faster than O(N log N) when N is very large and n is small.

### Space Complexity
- **Storage:** O(n) to store the heap, which is highly memory-efficient.

---

# Stage 2

The Stage 2 frontend implementation is placed in the `notification_app_fe` directory, utilizing React with Material UI as requested.
