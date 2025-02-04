<script lang="ts">
  import type { tVarData } from "lib/types";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  export let data: tVarData;
  const dispatch = createEventDispatcher();
  let show = true;
  let shown_var_type: string = "driver";
  function handleAddVar() {
    data[shown_var_type] = [
      {
        var_name: "New Variable",
        definition: "New Definition",
        factor_type: "social",
      },
      ...data[shown_var_type],
    ];
  }
  function handleDeleteVar(index: number) {
    data[shown_var_type] = data[shown_var_type].filter((_, i) => i !== index);
  }
  function handleSaveDef(updatedData: tVarData) {
    console.log(updatedData);
    dispatch("save", { type: "var_definitions", data: updatedData });
  }
</script>

<div class="relative flex flex-col gap-y-0.5 px-1">
  <div
    tabindex="0"
    role="button"
    on:click={() => (show = !show)}
    on:keyup={() => {}}
    class="entry-trigger font-serif"
  >
    Variable Definitions
  </div>
  <div
    role="button"
    tabindex="0"
    class="absolute right-2 top-0.5 flex items-center justify-center rounded-sm normal-case italic leading-3 text-gray-600 outline-double outline-1 outline-gray-300 hover:bg-gray-400"
    on:mouseover={(e) => {
      e.preventDefault();
    }}
    on:focus={(e) => {
      e.preventDefault();
    }}
    on:click={(e) => {
      e.preventDefault();
      handleSaveDef(data);
    }}
    on:keyup={() => {}}
  >
    <img src="save.svg" alt="" class="h-5 w-5" />
  </div>
  {#if show}
    <div
      class="var-type-definition-content flex gap-x-1 gap-y-1 divide-y pl-2 text-sm"
    >
      <div
        class="flex w-[6rem] flex-col items-end gap-y-0.5 divide-y border-r border-gray-300"
      >
        {#each Object.keys(data) as var_type, index}
          <div
            role="button"
            tabindex="0"
            class="flex w-[5.5rem] items-center px-0.5 capitalize transition-all hover:bg-gray-300"
            class:active={shown_var_type === var_type}
            on:click={() =>
              (shown_var_type = shown_var_type === var_type ? "" : var_type)}
            on:keyup={() => {}}
          >
            {var_type + "s"}
          </div>
        {/each}
      </div>
      {#if shown_var_type !== ""}
        <div
          transition:slide
          class="flex max-h-[12rem] flex-col divide-y overflow-y-auto pr-3"
        >
          <div class="flex divide-x">
            <div
              role="button"
              tabindex="0"
              class="flex w-full py-0.5 capitalize italic text-gray-600 hover:bg-gray-300"
              on:click={() => handleAddVar()}
              on:keyup={() => {}}
            >
              <div class="flex w-[5rem] items-center justify-center">
                <img src="add.svg" alt="add" class="h-4 w-4" />
              </div>
            </div>
          </div>
          {#each data[shown_var_type] as { var_name, definition, factor_type }, index}
            <div class="flex divide-x">
              <div class="flex w-[7rem] shrink-0">
                <div
                  class="relative flex w-[5rem] shrink-0 items-center justify-center capitalize italic text-gray-600"
                  contenteditable
                  on:blur={(e) => {
                    data[shown_var_type][index].var_name =
                      e.target.innerText.trim();
                  }}
                >
                  {var_name}
                </div>
                {#if factor_type !== "none"}
                  <div
                    role="button"
                    tabindex="0"
                    class="flex cursor-pointer items-center rounded text-xs text-gray-500 hover:bg-gray-400"
                    on:click={() =>
                      (data[shown_var_type][index].factor_type =
                        data[shown_var_type][index].factor_type === "social"
                          ? "ecological"
                          : "social")}
                    on:keyup={() => {}}
                  >
                    <img
                      src={`${factor_type}.svg`}
                      alt={factor_type}
                      class="h-4 w-4"
                    />
                  </div>
                {/if}
              </div>
              <div class="flex flex-grow pl-2 text-left italic text-gray-500">
                <div
                  class="min-h-[1.5rem] flex-grow"
                  contenteditable
                  on:blur={(e) => {
                    data[shown_var_type][index].definition =
                      e.target.innerText.trim();
                  }}
                >
                  {definition}
                </div>
                <div class="flex flex-shrink-0 items-center">
                  <div
                    role="button"
                    tabindex="0"
                    class="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-xs text-gray-500 hover:bg-gray-400"
                    on:click={() => handleDeleteVar(index)}
                    on:keyup={() => {}}
                  >
                    <img
                      src="remove.svg"
                      alt="remove"
                      class="h-3 w-3 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style lang="postcss">
  .entry-trigger {
    @apply rounded-sm bg-gray-200 text-gray-700 outline-double outline-1 outline-gray-600 hover:bg-gray-300;
  }
  .active {
    @apply pointer-events-none w-[6rem] bg-green-300 font-semibold;
  }
</style>
