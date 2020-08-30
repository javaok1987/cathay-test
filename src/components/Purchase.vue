<template>
  <div class="mx-auto max-w-lg overflow-hidden text-left text-gray-800 border-solid border border-gray-400">
    <ProcessingOrder :orders="processingOrderArr"></ProcessingOrder>
    <CompletedOrder :orders="completedOrderArr"></CompletedOrder>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('purchase');

import * as actionsTypes from '@/store/actions.type';

import CompletedOrder from '@/components/CompletedOrder';
import ProcessingOrder from '@/components/ProcessingOrder';

export default {
  name: 'Purchase',
  components: {
    CompletedOrder,
    ProcessingOrder,
  },
  computed: {
    ...mapGetters(['orders']),
    processingOrderArr() {
      // 進行中：status.code = 1 || 2.
      return this.orders.filter(function(item) {
        return item.status.code === 1 || item.status.code === 2;
      });
    },
    completedOrderArr() {
      // 已完成 : status.code = 3 || 4.
      return this.orders.filter(function(item) {
        return item.status.code === 3 || item.status.code === 4;
      });
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    ...mapActions({
      initialize: actionsTypes.INITIALIZE,
    }),
  },
};
</script>
