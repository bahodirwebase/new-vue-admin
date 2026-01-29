<script setup lang="ts">
import { NSpace } from 'naive-ui'
</script>

<template>
  <n-space vertical :size="16">
    <div>
      <h4>Inline Code</h4>
      <p>Use the <code class="inline-code">console.log()</code> function to debug your code.</p>
    </div>

    <div>
      <h4>Keyboard Input</h4>
      <p>Press <kbd class="keyboard">Ctrl</kbd> + <kbd class="keyboard">C</kbd> to copy.</p>
    </div>

    <div>
      <h4>Marked Text</h4>
      <p>This is <mark class="marked">highlighted text</mark> that stands out.</p>
    </div>

    <div>
      <h4>Deleted and Inserted Text</h4>
      <p><del class="deleted">Old text</del> <ins class="inserted">New text</ins></p>
    </div>

    <div>
      <h4>Block Code</h4>
      <pre class="block-code"><code>function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));</code></pre>
    </div>
  </n-space>
</template>
