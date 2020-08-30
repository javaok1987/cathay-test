<template>
  <section>
    <div class="bg-gray-200 text-gray-800 font-bold p-4">
      <h3 class="border-l-4 border-solid border-green-600 pl-2">已完成</h3>
    </div>
    <div
      v-for="(order, index) in orders"
      :key="index"
      class="border border-solid border-t-1 border-r-0 border-b-0 border-l-0 border-gray-400 bg-white px-4 py-3"
    >
      <div class="flex flex-wrap">
        <div class="self-center w-1/6">
          <img class="w-12 h-12 rounded-full mr-4 grayscale" :src="order.logo" />
        </div>
        <div class="w-4/6">
          <div>{{ order.status.type }}</div>
          <div class="leading-normal pt-2">{{ order.name }}</div>
        </div>
        <div class="flex justify-center self-center w-1/6">
          <a
            href="#"
            class="block w-3 h-3 origin-center transform rotate-45 border-t-2 border-r-2 border-gray-500 border-solid"
          ></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CompletedOrder',
  props: {
    orders: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.grayscale {
  filter: grayscale(100%);
}
</style>
