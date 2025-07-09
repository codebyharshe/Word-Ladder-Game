# word_ladder.py
from collections import deque

def load_dictionary(word_length, path="words.txt"):
    with open(path) as f:
        words = {line.strip().lower() for line in f if len(line.strip()) == word_length}
    return words

def get_neighbors(word, dictionary):
    neighbors = []
    for i in range(len(word)):
        for c in 'abcdefghijklmnopqrstuvwxyz':
            if c != word[i]:
                new_word = word[:i] + c + word[i+1:]
                if new_word in dictionary:
                    neighbors.append(new_word)
    return neighbors

def find_ladder(start, end, dictionary):
    if start == end:
        return [start]

    queue = deque([[start]])
    visited = set([start])

    while queue:
        path = queue.popleft()
        last_word = path[-1]

        for neighbor in get_neighbors(last_word, dictionary):
            if neighbor in visited:
                continue
            new_path = path + [neighbor]
            if neighbor == end:
                return new_path
            queue.append(new_path)
            visited.add(neighbor)
    
    return []  # No path found
