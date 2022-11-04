<script setup lang="ts">
import { ref, markRaw, watch, computed } from "vue";
import { loadFont } from "@/helpers/fontkit-utils";
import { getBase64, injectGlobalFontFace } from "@/helpers/css-utils";
import type { Font } from "fontkit";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

const font = ref<Font | null>(null);
const url = ref<string>("");
const axes = computed<Test>(() => {
  if (!font.value) return [];
  return font.value.variationAxes;
});
const variationSettings = ref({});

const setFont = async (e: InputFileEvent) => {
  const fontFile = e.target.files && e.target.files[0];
  if (!fontFile) return;

  url.value = await getBase64(fontFile);
  const fontData = await loadFont(fontFile);
  font.value = markRaw(fontData);
};

interface Test {
  [key: string]: {
    name: string;
    min: number;
    max: number;
    default: number;
  };
}

watch(axes, (axes) => {
  console.log(axes);
  if (!axes) return;

  variationSettings.value = Object.fromEntries(
    Object.entries(axes).map(([key, { default: value }]) => [key, value])
  );
});

watch(font, (font) => {
  if (!font) return;
  const fontStyle = font["OS/2"].fsSelection.italic ? "italic" : "normal";
  injectGlobalFontFace({
    fontFamily: font.familyName,
    fontStyle,
    fontWeight: 500,
    url: url.value,
  });
});
</script>

<template>
  <div class="mt-10 flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-semibold tracking-tight text-stone-900">
        {{ font?.fullName }}
      </h1>
      <span class="text-stone-500 text-sm">
        {{ font?.copyright }}
      </span>
    </div>
    <label
      v-if="font"
      for="update-font"
      class="bg-blue-500 text-sm hover:bg-blue-600 rounded-lg px-4 py-2 text-white font-semibold cursor-pointer"
    >
      <input
        id="update-font"
        name="update-font"
        type="file"
        @change.prevent="setFont"
        class="sr-only"
        accept=".ttf,.otf,.woff"
      />
      Upload new font
    </label>
  </div>
  <div
    v-if="!font"
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

  <div v-for="tag in Object.keys(axes)" :key="tag">
    <label :for="axes[tag].name">{{ axes[tag]?.name }}</label>
    <input
      type="range"
      :min="axes[tag]?.min"
      :max="axes[tag]?.max"
      :step="0.001"
      :value="variationSettings[tag]"
      @input.prevent="variationSettings[tag] = $event.target.value"
      :id="axes[tag]?.name"
    />
  </div>

  <div
    spellcheck="false"
    class="text-[3rem]"
    :style="{
      fontFamily: font?.familyName,
      fontVariationSettings: Object.keys(variationSettings)
        .map((key) => `'${key}' ${variationSettings[key]}`)
        .join(', '),
    }"
  >
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores fuga
    asperiores distinctio aliquid placeat voluptate eaque? Maiores beatae maxime
    eligendi, ad magnam ullam voluptatem atque eaque reprehenderit modi amet ea.
  </div>
</template>
