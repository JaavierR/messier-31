<script setup lang="ts">
import { ref } from "vue";
import { loadFont } from "@/helpers/fontkit-utils";
import type { Font } from "fontkit";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

const font = ref<Font | undefined>();

const setFont = async (e: InputFileEvent) => {
  const fontData = await loadFont(e);
  font.value = fontData;
};
</script>

<template>
  <div class="mt-10">
    This is a fucking test with vue {{ font?.familyName }}
  </div>
  <div
    class="mt-1 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 pt-5 pb-6"
  >
    <div class="space-y-1 text-center">
      <!-- svg -->
      <div class="flex text-sm text-slate-600">
        <label
          for="font-upload"
          class="relative cursor-pointer rounded-lg bg-white font-medium text-blue-600 focus-whitin:outline-none focus-whitin:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hove:text-blue-500"
        >
          <span>Upload a font</span>
          <input
            id="font-upload"
            name="file-upload"
            type="file"
            class="sr-only"
            accept=".ttf,.otf,.woff"
            @change.prevent="setFont"
          />
        </label>
        <p class="pl-1">or drag and drop</p>
      </div>
      <p class="text-xs text-slate-500">TTF, OTF, WOFF up to 10MB</p>
    </div>
  </div>
  <!-- @change="setFont" -->
</template>
