<template>
  <div
    :class="[
      isDarkMode
        ? 'dark bg-slate-950 text-slate-100'
        : 'bg-slate-50 text-slate-800',
      'min-h-screen flex font-sans antialiased transition-colors duration-200',
    ]"
  >
    <!-- MOBILE SIDEBAR BACKDROP -->
    <div
      v-if="isMobileSidebarOpen"
      @click="isMobileSidebarOpen = false"
      class="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
    ></div>

    <!-- SIDEBAR NAVIGATION -->
    <aside
      :class="[
        isMobileSidebarOpen
          ? 'translate-x-0'
          : '-translate-x-full lg:translate-x-0',
        isDarkMode
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-slate-200',
        'fixed lg:static inset-y-0 left-0 z-50 w-64 border-r flex flex-col transition-transform duration-300 ease-in-out shrink-0',
      ]"
    >
      <!-- BRAND LOGO HEADER -->
      <div
        class="h-16 flex items-center justify-between px-6 border-b border-inherit"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div>
            <h1 class="font-extrabold text-lg tracking-tight leading-tight">
              NS <span class="text-indigo-500">STORE</span>
            </h1>
            <p
              class="text-[10px] text-slate-400 font-medium tracking-wider uppercase"
            >
              Inventory v1.0
            </p>
          </div>
        </div>
        <button
          @click="isMobileSidebarOpen = false"
          class="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="
            activeTab = item.id;
            isMobileSidebarOpen = false;
          "
          :class="[
            activeTab === item.id
              ? (isDarkMode
                  ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30'
                  : 'bg-indigo-50 text-indigo-600 border-indigo-200') +
                ' font-semibold border'
              : isDarkMode
                ? 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-150 text-sm',
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 shrink-0" />
          <span>{{ item.name }}</span>
          <span
            v-if="item.id === 'products' && lowStockCount > 0"
            class="ml-auto bg-amber-500/20 text-amber-500 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-500/30"
          >
            {{ lowStockCount }}
          </span>
        </button>
      </nav>

      <!-- USER FOOTER -->
      <div
        :class="[
          isDarkMode
            ? 'border-slate-800 bg-slate-950/50'
            : 'border-slate-200 bg-slate-50',
          'p-4 border-t flex items-center space-x-3',
        ]"
      >
        <div
          class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-inner"
        >
          AP 
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">Alex Parker</p>
          <p class="text-xs text-slate-400 truncate">Inventory Manager</p>
        </div>
      </div>
    </aside>

    <!-- MAIN CONTENT CONTAINER -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- TOP HEADER BAR -->
      <header
        :class="[
          isDarkMode
            ? 'bg-slate-900/80 border-slate-800'
            : 'bg-white/80 border-slate-200',
          'h-16 border-b backdrop-blur flex items-center justify-between px-4 sm:px-6 z-10',
        ]"
      >
        <div class="flex items-center space-x-3 sm:space-x-4">
          <button
            @click="isMobileSidebarOpen = true"
            class="lg:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 class="text-lg sm:text-xl font-bold capitalize tracking-tight">
            {{ activeTabName }}
          </h2>
        </div>

        <div class="flex items-center space-x-2 sm:space-x-3">
          <!-- SEARCH FIELD -->
          <div class="relative w-36 sm:w-64">
            <svg
              class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search SKU or item..."
              :class="[
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400',
                'w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all',
              ]"
            />
          </div>

          <!-- THEME TOGGLE -->
          <button
            @click="isDarkMode = !isDarkMode"
            :class="[
              isDarkMode
                ? 'bg-slate-800 text-amber-400 border-slate-700'
                : 'bg-slate-100 text-slate-600 border-slate-200',
              'p-2 border rounded-xl hover:opacity-80 transition',
            ]"
            title="Toggle theme"
          >
            <svg
              v-if="isDarkMode"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- NOTIFICATION BELL & DROPDOWN -->
          <div class="relative">
            <button
              @click="isNotificationsOpen = !isNotificationsOpen"
              :class="[
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300'
                  : 'bg-slate-100 border-slate-200 text-slate-700',
                'relative p-2 border rounded-xl hover:opacity-80 transition',
              ]"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                v-if="lowStockCount > 0"
                class="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"
              ></span>
              <span
                v-if="lowStockCount > 0"
                class="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"
              ></span>
            </button>

            <!-- DROPDOWN PANEL -->
            <div
              v-if="isNotificationsOpen"
              @click.outside="isNotificationsOpen = false"
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-800',
                'absolute right-0 mt-2 w-80 border rounded-2xl shadow-2xl p-4 z-50 space-y-3',
              ]"
            >
              <div
                class="flex items-center justify-between border-b pb-2 border-inherit"
              >
                <h4 class="font-bold text-sm">Notifications</h4>
                <span class="text-xs text-amber-500 font-semibold"
                  >{{ lowStockCount }} Alerts</span
                >
              </div>
              <div
                v-if="alertProducts.length === 0"
                class="text-xs text-slate-400 text-center py-4"
              >
                No active alerts!
              </div>
              <div v-else class="space-y-2 max-h-60 overflow-y-auto">
                <div
                  v-for="item in alertProducts.slice(0, 4)"
                  :key="item.id"
                  :class="[
                    isDarkMode ? 'bg-slate-800/60' : 'bg-slate-50',
                    'p-2.5 rounded-xl flex items-center justify-between text-xs',
                  ]"
                >
                  <div>
                    <p class="font-semibold">{{ item.name }}</p>
                    <p class="text-[10px] text-slate-400 font-mono">
                      {{ item.sku }} • Qty: {{ item.quantity }}
                    </p>
                  </div>
                  <button
                    @click="openAdjustModal(item)"
                    class="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-medium"
                  >
                    Restock
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ADD PRODUCT BTN QUICK -->
          <button
            @click="openAddProductModal"
            class="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-lg shadow-indigo-500/20"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span class="hidden sm:inline">New Product</span>
          </button>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <!-- ======================================================== -->
        <!-- TAB 1: DASHBOARD OVERVIEW -->
        <!-- ======================================================== -->
        <div v-if="activeTab === 'dashboard'" class="space-y-6">
          <!-- KPI METRIC CARDS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- TOTAL ITEMS -->
            <div
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200',
                'border rounded-2xl p-5 shadow-sm relative overflow-hidden',
              ]"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                  >
                    Total Products
                  </p>
                  <h3 class="text-2xl sm:text-3xl font-black mt-1">
                    {{ totalProducts }}
                  </h3>
                </div>
                <div
                  class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <p class="text-xs text-slate-400 mt-3">
                <span class="text-emerald-500 font-bold">{{
                  categories.length
                }}</span>
                Categories tracked
              </p>
            </div>

            <!-- TOTAL VALUATION -->
            <div
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200',
                'border rounded-2xl p-5 shadow-sm relative overflow-hidden',
              ]"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                  >
                    Stock Valuation
                  </p>
                  <h3 class="text-2xl sm:text-3xl font-black mt-1">
                    ${{ formatCurrency(totalValue) }}
                  </h3>
                </div>
                <div
                  class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p class="text-xs text-slate-400 mt-3">
                Avg value:
                <span class="font-bold text-slate-300"
                  >${{ formatCurrency(avgItemValue) }}</span
                >
                / item
              </p>
            </div>

            <!-- LOW STOCK WARNINGS -->
            <div
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200',
                'border rounded-2xl p-5 shadow-sm relative overflow-hidden',
              ]"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                  >
                    Low Stock Alerts
                  </p>
                  <h3
                    class="text-2xl sm:text-3xl font-black text-amber-500 mt-1"
                  >
                    {{ lowStockCount }}
                  </h3>
                </div>
                <div
                  class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <p class="text-xs text-slate-400 mt-3">Below minimum threshold</p>
            </div>

            <!-- OUT OF STOCK -->
            <div
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200',
                'border rounded-2xl p-5 shadow-sm relative overflow-hidden',
              ]"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p
                    class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                  >
                    Out of Stock
                  </p>
                  <h3
                    class="text-2xl sm:text-3xl font-black text-rose-500 mt-1"
                  >
                    {{ outOfStockCount }}
                  </h3>
                </div>
                <div
                  class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                </div>
              </div>
              <p class="text-xs text-slate-400 mt-3">
                Requires immediate reorder
              </p>
            </div>
          </div>

          <!-- VISUAL CHARTS ROW -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- CATEGORY DISTRIBUTION BAR REPRESENTATION -->
            <div
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200',
                'border rounded-2xl p-5 flex flex-col justify-between',
              ]"
            >
              <div>
                <h3 class="font-bold text-sm mb-1 flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                  </svg>
                  Stock Value by Category
                </h3>
                <p class="text-xs text-slate-400 mb-4">
                  Capital distribution breakdown
                </p>
              </div>

              <div class="space-y-3.5">
                <div
                  v-for="cat in categoryMetrics"
                  :key="cat.name"
                  class="space-y-1"
                >
                  <div class="flex justify-between text-xs font-medium">
                    <span>{{ cat.name }}</span>
                    <span class="font-bold"
                      >${{ formatCurrency(cat.value) }} ({{
                        cat.percentage
                      }}%)</span
                    >
                  </div>
                  <div
                    :class="[
                      isDarkMode ? 'bg-slate-800' : 'bg-slate-100',
                      'w-full h-2 rounded-full overflow-hidden flex',
                    ]"
                  >
                    <div
                      class="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                      :style="{ width: cat.percentage + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- MOVEMENTS TREND (IN VS OUT) -->
            <div
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200',
                'lg:col-span-2 border rounded-2xl p-5 flex flex-col justify-between',
              ]"
            >
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="font-bold text-sm flex items-center gap-2">
                    <svg
                      class="w-4 h-4 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18"
                      />
                    </svg>
                    Recent Stock Movements
                  </h3>
                  <p class="text-xs text-slate-400">
                    Restock vs Dispatch Activity
                  </p>
                </div>
                <div class="flex items-center space-x-3 text-xs">
                  <span class="flex items-center gap-1"
                    ><span
                      class="w-3 h-3 rounded-full bg-emerald-500 inline-block"
                    ></span>
                    Stock IN (+{{ totalStockInQty }})</span
                  >
                  <span class="flex items-center gap-1"
                    ><span
                      class="w-3 h-3 rounded-full bg-rose-500 inline-block"
                    ></span>
                    Stock OUT (-{{ totalStockOutQty }})</span
                  >
                </div>
              </div>

              <!-- VISUAL BAR CHART GRAPH -->
              <div
                class="h-48 flex items-end justify-between gap-2 pt-4 px-2 border-b border-inherit"
              >
                <div
                  v-for="(day, idx) in recentMovementTrends"
                  :key="idx"
                  class="flex-1 flex flex-col items-center h-full justify-end gap-1 group"
                >
                  <div class="w-full flex items-end justify-center gap-1 h-36">
                    <div
                      class="w-1/2 bg-emerald-500/80 hover:bg-emerald-500 rounded-t transition-all duration-300 relative"
                      :style="{
                        height:
                          Math.min(100, (day.in / maxTrendQty) * 100) + '%',
                      }"
                    >
                      <span
                        class="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded shadow z-10 transition pointer-events-none"
                        >+{{ day.in }}</span
                      >
                    </div>
                    <div
                      class="w-1/2 bg-rose-500/80 hover:bg-rose-500 rounded-t transition-all duration-300 relative"
                      :style="{
                        height:
                          Math.min(100, (day.out / maxTrendQty) * 100) + '%',
                      }"
                    >
                      <span
                        class="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded shadow z-10 transition pointer-events-none"
                        >-{{ day.out }}</span
                      >
                    </div>
                  </div>
                  <span class="text-[10px] text-slate-400 font-mono mt-1">{{
                    day.label
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- RECENT AUDIT TRAIL TABLE SNIPPET -->
          <div
            :class="[
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200',
              'border rounded-2xl p-5 shadow-sm',
            ]"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-sm">Live Stock Activity</h3>
              <button
                @click="activeTab = 'transactions'"
                class="text-xs text-indigo-500 hover:underline font-semibold"
              >
                View Full Audit Log &rarr;
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr
                    :class="[
                      isDarkMode
                        ? 'border-slate-800 text-slate-400'
                        : 'border-slate-200 text-slate-500',
                      'border-b font-semibold uppercase tracking-wider',
                    ]"
                  >
                    <th class="py-3 px-2">Time</th>
                    <th class="py-3 px-2">Product</th>
                    <th class="py-3 px-2">Type</th>
                    <th class="py-3 px-2">Quantity</th>
                    <th class="py-3 px-2">Note / Reason</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-inherit">
                  <tr
                    v-for="tx in transactions.slice(0, 5)"
                    :key="tx.id"
                    class="hover:bg-indigo-500/5 transition"
                  >
                    <td class="py-3 px-2 font-mono text-slate-400">
                      {{ formatDate(tx.timestamp) }}
                    </td>
                    <td class="py-3 px-2 font-semibold">
                      {{ tx.productName }}
                      <span class="text-[10px] text-slate-400 font-mono"
                        >({{ tx.sku }})</span
                      >
                    </td>
                    <td class="py-3 px-2">
                      <span
                        :class="
                          tx.type === 'IN'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                        "
                        class="px-2 py-0.5 rounded-full border text-[10px] font-bold"
                      >
                        {{ tx.type }}
                      </span>
                    </td>
                    <td
                      :class="[
                        tx.type === 'IN' ? 'text-emerald-500' : 'text-rose-500',
                        'py-3 px-2 font-bold font-mono',
                      ]"
                    >
                      {{ tx.type === "IN" ? "+" : "-" }}{{ tx.quantity }}
                    </td>
                    <td class="py-3 px-2 text-slate-400">
                      {{ tx.note || "Manual edit" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 2: INVENTORY PRODUCT MANAGEMENT -->
        <!-- ======================================================== -->
        <div v-if="activeTab === 'products'" class="space-y-6">
          <!-- CONTROLS & FILTER BAR -->
          <div
            :class="[
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200',
              'border rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between',
            ]"
          >
            <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <!-- CATEGORY FILTER -->
              <select
                v-model="selectedCategory"
                :class="[
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-800',
                  'px-3 py-2 text-xs rounded-xl border focus:outline-none',
                ]"
              >
                <option value="ALL">All Categories</option>
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>

              <!-- STATUS FILTER -->
              <select
                v-model="selectedStatus"
                :class="[
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-800',
                  'px-3 py-2 text-xs rounded-xl border focus:outline-none',
                ]"
              >
                <option value="ALL">All Statuses</option>
                <option value="IN_STOCK">In Stock</option>
                <option value="LOW_STOCK">Low Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>

              <!-- RESET FILTERS -->
              <button
                @click="resetFilters"
                class="text-xs text-slate-400 hover:text-indigo-500 px-2 py-1 flex items-center gap-1"
              >
                <svg
                  class="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset
              </button>
            </div>

            <!-- EXPORT & ACTIONS -->
            <div class="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                @click="exportCSV"
                :class="[
                  isDarkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200',
                  'px-3.5 py-2 border rounded-xl text-xs font-semibold flex items-center gap-2 transition',
                ]"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export CSV
              </button>
              <button
                @click="openAddProductModal"
                class="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-indigo-500/20"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Item
              </button>
            </div>
          </div>

          <!-- PRODUCTS TABLE -->
          <div
            :class="[
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200',
              'border rounded-2xl overflow-hidden shadow-sm',
            ]"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr
                    :class="[
                      isDarkMode
                        ? 'bg-slate-950/50 border-slate-800 text-slate-400'
                        : 'bg-slate-50 border-slate-200 text-slate-500',
                      'border-b text-[11px] font-bold uppercase tracking-wider',
                    ]"
                  >
                    <th class="p-4 pl-6">Product Details</th>
                    <th class="p-4">Category</th>
                    <th class="p-4">Cost / Selling</th>
                    <th class="p-4">Stock Level</th>
                    <th class="p-4">Min Alert</th>
                    <th class="p-4">Total Value</th>
                    <th class="p-4">Status</th>
                    <th class="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-inherit text-xs">
                  <tr v-if="paginatedProducts.length === 0">
                    <td colspan="8" class="p-12 text-center text-slate-400">
                      No matching inventory items found.
                    </td>
                  </tr>
                  <tr
                    v-for="item in paginatedProducts"
                    :key="item.id"
                    class="hover:bg-indigo-500/5 transition"
                  >
                    <td class="p-4 pl-6">
                      <div class="font-bold text-sm">{{ item.name }}</div>
                      <div class="text-[11px] text-slate-400 font-mono">
                        {{ item.sku }}
                      </div>
                    </td>
                    <td class="p-4">
                      <span
                        :class="[
                          isDarkMode
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700',
                          'px-2.5 py-1 rounded-lg text-[11px] font-medium border',
                        ]"
                      >
                        {{ item.category }}
                      </span>
                    </td>
                    <td class="p-4 font-mono">
                      <div class="font-semibold text-emerald-500">
                        ${{ formatCurrency(item.sellingPrice) }}
                      </div>
                      <div class="text-[10px] text-slate-400">
                        Cost: ${{ formatCurrency(item.costPrice) }}
                      </div>
                    </td>
                    <td class="p-4">
                      <div class="flex items-center space-x-2">
                        <button
                          @click="quickAdjustQty(item, -1)"
                          class="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center hover:opacity-80"
                        >
                          -
                        </button>
                        <span
                          :class="
                            item.quantity === 0
                              ? 'text-rose-500 font-black'
                              : 'font-bold'
                          "
                          class="w-8 text-center text-sm"
                          >{{ item.quantity }}</span
                        >
                        <button
                          @click="quickAdjustQty(item, 1)"
                          class="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center hover:opacity-80"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td class="p-4 font-mono text-slate-400">
                      {{ item.minThreshold }}
                    </td>
                    <td class="p-4 font-bold font-mono">
                      ${{ formatCurrency(item.sellingPrice * item.quantity) }}
                    </td>
                    <td class="p-4">
                      <span
                        :class="getStatusBadgeClass(item)"
                        class="px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider"
                      >
                        {{ getStatusLabel(item) }}
                      </span>
                    </td>
                    <td class="p-4 pr-6 text-right space-x-1.5">
                      <button
                        @click="openAdjustModal(item)"
                        title="Adjust Stock"
                        class="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      </button>
                      <button
                        @click="openEditProductModal(item)"
                        title="Edit Item"
                        class="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-500/10"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        @click="deleteProduct(item)"
                        title="Delete Item"
                        class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- TABLE PAGINATION -->
            <div
              :class="[
                isDarkMode
                  ? 'border-slate-800 bg-slate-950/40'
                  : 'border-slate-200 bg-slate-50',
                'p-4 border-t flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3',
              ]"
            >
              <span
                >Showing {{ paginationStart }} to {{ paginationEnd }} of
                {{ filteredProducts.length }} items</span
              >
              <div class="flex items-center space-x-2">
                <button
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="px-3 py-1.5 rounded-lg border border-inherit disabled:opacity-40"
                >
                  Prev
                </button>
                <span class="font-bold text-slate-300"
                  >Page {{ currentPage }} of {{ totalPages }}</span
                >
                <button
                  @click="currentPage++"
                  :disabled="currentPage >= totalPages"
                  class="px-3 py-1.5 rounded-lg border border-inherit disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 3: TRANSACTION MOVEMENT AUDIT LOG -->
        <!-- ======================================================== -->
        <div v-if="activeTab === 'transactions'" class="space-y-6">
          <div
            :class="[
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200',
              'border rounded-2xl p-5 shadow-sm',
            ]"
          >
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3"
            >
              <h3 class="font-bold text-sm">Complete Inventory Audit Trail</h3>

              <!-- TYPE FILTER -->
              <div class="flex items-center space-x-2">
                <button
                  @click="txFilterType = 'ALL'"
                  :class="
                    txFilterType === 'ALL'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  "
                  class="px-3 py-1 rounded-lg text-xs font-semibold"
                >
                  All
                </button>
                <button
                  @click="txFilterType = 'IN'"
                  :class="
                    txFilterType === 'IN'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  "
                  class="px-3 py-1 rounded-lg text-xs font-semibold"
                >
                  Stock IN
                </button>
                <button
                  @click="txFilterType = 'OUT'"
                  :class="
                    txFilterType === 'OUT'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  "
                  class="px-3 py-1 rounded-lg text-xs font-semibold"
                >
                  Stock OUT
                </button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr
                    :class="[
                      isDarkMode
                        ? 'border-slate-800 text-slate-400'
                        : 'border-slate-200 text-slate-500',
                      'border-b font-semibold uppercase tracking-wider',
                    ]"
                  >
                    <th class="py-3 px-3">Date & Time</th>
                    <th class="py-3 px-3">SKU</th>
                    <th class="py-3 px-3">Product Name</th>
                    <th class="py-3 px-3">Type</th>
                    <th class="py-3 px-3">Qty Changed</th>
                    <th class="py-3 px-3">Reason / Note</th>
                    <th class="py-3 px-3">Actor</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-inherit">
                  <tr v-if="filteredTransactions.length === 0">
                    <td colspan="7" class="p-8 text-center text-slate-400">
                      No stock movements recorded matching filter.
                    </td>
                  </tr>
                  <tr
                    v-for="tx in filteredTransactions"
                    :key="tx.id"
                    class="hover:bg-indigo-500/5 transition"
                  >
                    <td class="py-3 px-3 font-mono text-slate-400">
                      {{ formatDate(tx.timestamp) }}
                    </td>
                    <td class="py-3 px-3 font-mono font-bold">{{ tx.sku }}</td>
                    <td class="py-3 px-3 font-semibold">
                      {{ tx.productName }}
                    </td>
                    <td class="py-3 px-3">
                      <span
                        :class="
                          tx.type === 'IN'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                        "
                        class="px-2.5 py-0.5 rounded-full border text-[10px] font-bold"
                      >
                        {{ tx.type }}
                      </span>
                    </td>
                    <td
                      :class="[
                        tx.type === 'IN' ? 'text-emerald-500' : 'text-rose-500',
                        'py-3 px-3 font-bold font-mono text-sm',
                      ]"
                    >
                      {{ tx.type === "IN" ? "+" : "-" }}{{ tx.quantity }}
                    </td>
                    <td class="py-3 px-3 text-slate-400">{{ tx.note }}</td>
                    <td class="py-3 px-3 text-slate-400 font-mono text-[11px]">
                      {{ tx.actor || "Alex Parker" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 4: ANALYTICS & SETTINGS -->
        <!-- ======================================================== -->
        <div v-if="activeTab === 'analytics'" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200',
                'border rounded-2xl p-5',
              ]"
            >
              <p class="text-xs text-slate-400 font-semibold uppercase">
                Stock Health Score
              </p>
              <h3 class="text-3xl font-black text-emerald-500 mt-1">
                {{ stockHealthPercentage }}%
              </h3>
              <p class="text-xs text-slate-400 mt-2">
                Percentage of items above reorder point
              </p>
            </div>
            <div
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200',
                'border rounded-2xl p-5',
              ]"
            >
              <p class="text-xs text-slate-400 font-semibold uppercase">
                Potential Profit Margin
              </p>
              <h3 class="text-3xl font-black text-indigo-500 mt-1">
                ${{ formatCurrency(potentialProfit) }}
              </h3>
              <p class="text-xs text-slate-400 mt-2">
                Total Selling Value minus Cost Basis
              </p>
            </div>
            <div
              :class="[
                isDarkMode
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200',
                'border rounded-2xl p-5',
              ]"
            >
              <p class="text-xs text-slate-400 font-semibold uppercase">
                Turnover Index
              </p>
              <h3 class="text-3xl font-black text-violet-500 mt-1">4.8x</h3>
              <p class="text-xs text-slate-400 mt-2">
                Estimated inventory cycles per annum
              </p>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'settings'" class="max-w-2xl space-y-6">
          <div
            :class="[
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200',
              'border rounded-2xl p-6 space-y-4',
            ]"
          >
            <h3 class="font-bold text-base border-b pb-3 border-inherit">
              Database Management
            </h3>
            <p class="text-xs text-slate-400">
              Manage local mock state or restore original demo catalog items.
            </p>

            <div class="pt-2 flex items-center gap-3">
              <button
                @click="resetToDefaultData"
                class="px-4 py-2 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white border border-rose-500/30 rounded-xl text-xs font-semibold transition"
              >
                Reset Demo Mock Data
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL 1: ADD / EDIT PRODUCT -->
    <!-- ======================================================== -->
    <div
      v-if="showProductModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
    >
      <div
        :class="[
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900',
          'border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden',
        ]"
      >
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-inherit"
        >
          <h3 class="font-bold text-base">
            {{ isEditing ? "Edit Product" : "Add New Product" }}
          </h3>
          <button
            @click="showProductModal = false"
            class="text-slate-400 hover:text-slate-600"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveProduct" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-semibold mb-1">Product Name *</label>
            <input
              v-model="productForm.name"
              required
              type="text"
              placeholder="e.g. Wireless Ergonomic Mouse"
              :class="[
                isDarkMode
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-slate-100 border-slate-200',
                'w-full p-2.5 rounded-xl border focus:outline-none',
              ]"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold mb-1">SKU Code *</label>
              <input
                v-model="productForm.sku"
                required
                type="text"
                placeholder="e.g. ELEC-1092"
                :class="[
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-slate-100 border-slate-200',
                  'w-full p-2.5 rounded-xl border focus:outline-none font-mono',
                ]"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">Category *</label>
              <select
                v-model="productForm.category"
                required
                :class="[
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-slate-100 border-slate-200',
                  'w-full p-2.5 rounded-xl border focus:outline-none',
                ]"
              >
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold mb-1">Cost Price ($) *</label>
              <input
                v-model.number="productForm.costPrice"
                required
                type="number"
                step="0.01"
                min="0"
                :class="[
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-slate-100 border-slate-200',
                  'w-full p-2.5 rounded-xl border focus:outline-none',
                ]"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1"
                >Selling Price ($) *</label
              >
              <input
                v-model.number="productForm.sellingPrice"
                required
                type="number"
                step="0.01"
                min="0"
                :class="[
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-slate-100 border-slate-200',
                  'w-full p-2.5 rounded-xl border focus:outline-none',
                ]"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold mb-1">Initial Quantity *</label>
              <input
                v-model.number="productForm.quantity"
                required
                type="number"
                min="0"
                :class="[
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-slate-100 border-slate-200',
                  'w-full p-2.5 rounded-xl border focus:outline-none',
                ]"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1"
                >Min Threshold Alert *</label
              >
              <input
                v-model.number="productForm.minThreshold"
                required
                type="number"
                min="0"
                :class="[
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-slate-100 border-slate-200',
                  'w-full p-2.5 rounded-xl border focus:outline-none',
                ]"
              />
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-inherit">
            <button
              type="button"
              @click="showProductModal = false"
              class="px-4 py-2 font-semibold text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 2: QUICK STOCK ADJUSTMENT -->
    <div
      v-if="showAdjustModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
    >
      <div
        :class="[
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900',
          'border rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden p-6 text-xs space-y-4',
        ]"
      >
        <h3 class="font-bold text-sm">Stock Adjustment</h3>
        <p class="text-slate-400">
          Adjusting:
          <strong class="text-indigo-400">{{
            selectedProductForAdjust?.name
          }}</strong>
        </p>

        <div>
          <label class="block font-semibold mb-1">Movement Type</label>
          <select
            v-model="adjustType"
            :class="[
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-slate-100 border-slate-200',
              'w-full p-2.5 rounded-xl border focus:outline-none',
            ]"
          >
            <option value="IN">Stock IN (+ Restock / Supplier)</option>
            <option value="OUT">Stock OUT (- Dispatch / Sale / Loss)</option>
          </select>
        </div>

        <div>
          <label class="block font-semibold mb-1">Quantity</label>
          <input
            v-model.number="adjustQty"
            type="number"
            min="1"
            :class="[
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-slate-100 border-slate-200',
              'w-full p-2.5 rounded-xl border focus:outline-none',
            ]"
          />
        </div>

        <div>
          <label class="block font-semibold mb-1"
            >Reason / Reference Note</label
          >
          <input
            v-model="adjustNote"
            type="text"
            placeholder="e.g. PO-8891 or Damaged Item"
            :class="[
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-slate-100 border-slate-200',
              'w-full p-2.5 rounded-xl border focus:outline-none',
            ]"
          />
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button
            @click="showAdjustModal = false"
            class="px-3.5 py-2 text-slate-400 font-semibold"
          >
            Cancel
          </button>
          <button
            @click="saveStockAdjust"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- TOAST NOTIFICATIONS -->
    <div class="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center space-x-2 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl shadow-2xl text-xs"
      >
        <span
          class="w-2 h-2 rounded-full"
          :class="toast.type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'"
        ></span>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, h } from "vue";

// --- SAMPLE SEED DATA ---
const initialProducts = [
  // WOMEN CATEGORY
  {
    id: "1",
    name: "Women's Floral Summer Dress",
    sku: "WMS-FLR-DRS-01",
    category: "Women's wear",
    costPrice: 15.00,
    sellingPrice: 29.99,
    quantity: 46,
    minThreshold: 10,
  },
  {
    id: "2",
    name: "High-Waisted Denim Jeans",
    sku: "WMS-DNM-JNS-02",
    category: "Women's wear",
    costPrice: 18.50,
    sellingPrice: 39.99,
    quantity: 30,
    minThreshold: 8,
  },

   // MEN CATEGORY
  {
    id: "3",
    name: "Men's Slim-Fit Oxford Shirt",
    sku: "MEN-OXF-SHR-01",
    category: "Men's wear",
    costPrice: 12.00,
    sellingPrice: 24.99,
    quantity: 50,
    minThreshold: 12,
  },
  {
    id: "4",
    name: "Classic Chino Trousers",
    sku: "MEN-CHN-TR-02",
    category: "Men's wear",
    costPrice: 16.00,
    sellingPrice: 34.99,
    quantity: 25,
    minThreshold: 5,
  },
  // 🧸 KIDS CATEGORY
  {
    id: "5",
    name: "Toddler Cotton Pajama Set",
    sku: "KID-COT-PJ-01",
    category: "Kids",
    costPrice: 7.50,
    sellingPrice: 14.99,
    quantity: 60,
    minThreshold: 15,
  },
  {
    id: "6",
    name: "Kids Light-Up Sneakers",
    sku: "KID-LGT-SNK-02",
    category: "Kids",
    costPrice: 11.00,
    sellingPrice: 21.99,
    quantity: 18,
    minThreshold: 6,
  },
 // ACCESSORY CATEGORY
  {
    id: "7",
    name: "Leather Minimalist Wallet",
    sku: "ACC-LTH-WLT-01",
    category: "Accessories",
    costPrice: 9.00,
    sellingPrice: 19.99,
    quantity: 40,
    minThreshold: 10,
  },
  {
    id: "8",
    name: "Aviator Polarized Sunglasses",
    sku: "ACC-AVT-SUN-02",
    category: "Accessories",
    costPrice: 6.50,
    sellingPrice: 15.00,
    quantity: 12,
    minThreshold: 4,
  }
];

const categories = ["Women's wear", "Men's wear","Kids","Accessories"];

// --- STATE DEFINITIONS ---
const isDarkMode = ref(true);
const isMobileSidebarOpen = ref(false);
const isNotificationsOpen = ref(false);
const activeTab = ref("dashboard");

const products = ref([]);
const transactions = ref([]);

const searchQuery = ref("");
const selectedCategory = ref("ALL");
const selectedStatus = ref("ALL");
const txFilterType = ref("ALL");

const currentPage = ref(1);
const itemsPerPage = ref(6);

// Modals
const showProductModal = ref(false);
const isEditing = ref(false);
const productForm = ref({
  id: null,
  name: "",
  sku: "",
  category: "Electronics",
  costPrice: 0,
  sellingPrice: 0,
  quantity: 0,
  minThreshold: 5
});

const showAdjustModal = ref(false);
const selectedProductForAdjust = ref(null);
const adjustType = ref("IN");
const adjustQty = ref(10);
const adjustNote = ref("");

const toasts = ref([]);

// --- INLINE SVG ICON COMPONENTS FOR SIDEBAR ---
const IconDashboard = {
  render: () =>
    h(
      "svg",
      {
        class: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
        }),
      ],
    ),
};
const IconBox = {
  render: () =>
    h(
      "svg",
      {
        class: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
        }),
      ],
    ),
};
const IconHistory = {
  render: () =>
    h(
      "svg",
      {
        class: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        }),
      ],
    ),
};
const IconAnalytics = {
  render: () =>
    h(
      "svg",
      {
        class: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        }),
      ],
    ),
};
const IconSettings = {
  render: () =>
    h(
      "svg",
      {
        class: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        }),
      ],
    ),
};

const navItems = [
  { id: "dashboard", name: "Overview", icon: IconDashboard },
  { id: "sale", name: "POS/sale", icon: IconDashboard },
  { id: "products", name: "Inventory Items", icon: IconBox },
  { id: "transactions", name: "Movement Logs", icon: IconHistory },
  { id: "analytics", name: "Analytics", icon: IconAnalytics },
  { id: "settings", name: "Settings", icon: IconSettings },
];

// --- STREAMING_CHUNK:Computing KPIs and filtered reactivity... ---
// --- COMPUTED PROPERTIES ---
const activeTabName = computed(
  () => navItems.find((i) => i.id === activeTab.value)?.name || "Dashboard",
);

const totalProducts = computed(() => products.value.length);
const totalValue = computed(() =>
  products.value.reduce((acc, p) => acc + p.sellingPrice * p.quantity, 0),
);
const avgItemValue = computed(() =>
  totalProducts.value ? totalValue.value / totalProducts.value : 0,
);

const alertProducts = computed(() =>
  products.value.filter((p) => p.quantity <= p.minThreshold),
);
const lowStockCount = computed(() => alertProducts.value.length);
const outOfStockCount = computed(
  () => products.value.filter((p) => p.quantity === 0).length,
);

const stockHealthPercentage = computed(() => {
  if (!totalProducts.value) return 100;
  const healthy = products.value.filter(
    (p) => p.quantity > p.minThreshold,
  ).length;
  return Math.round((healthy / totalProducts.value) * 100);
});

const potentialProfit = computed(() => {
  return products.value.reduce(
    (acc, p) => acc + (p.sellingPrice - p.costPrice) * p.quantity,
    0,
  );
});

// Category metrics breakdown
const categoryMetrics = computed(() => {
  const total = totalValue.value || 1;
  return categories.map((cat) => {
    const val = products.value
      .filter((p) => p.category === cat)
      .reduce((acc, p) => acc + p.sellingPrice * p.quantity, 0);
    return {
      name: cat,
      value: val,
      percentage: Math.round((val / total) * 100),
    };
  });
});

// Filtered products list for inventory table
const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchesSearch =
      !searchQuery.value ||
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === "ALL" || p.category === selectedCategory.value;

    let matchesStatus = true;
    if (selectedStatus.value === "OUT_OF_STOCK")
      matchesStatus = p.quantity === 0;
    else if (selectedStatus.value === "LOW_STOCK")
      matchesStatus = p.quantity > 0 && p.quantity <= p.minThreshold;
    else if (selectedStatus.value === "IN_STOCK")
      matchesStatus = p.quantity > p.minThreshold;

    return matchesSearch && matchesCategory && matchesStatus;
  });
});

// Pagination
const totalPages = computed(
  () => Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1,
);
const paginationStart = computed(() =>
  filteredProducts.value.length
    ? (currentPage.value - 1) * itemsPerPage.value + 1
    : 0,
);
const paginationEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredProducts.value.length,
  ),
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProducts.value.slice(start, start + itemsPerPage.value);
});

// Filtered Transactions
const filteredTransactions = computed(() => {
  if (txFilterType.value === "ALL") return transactions.value;
  return transactions.value.filter((t) => t.type === txFilterType.value);
});

// Trend calculation metrics
const totalStockInQty = computed(() =>
  transactions.value
    .filter((t) => t.type === "IN")
    .reduce((acc, t) => acc + t.quantity, 0),
);
const totalStockOutQty = computed(() =>
  transactions.value
    .filter((t) => t.type === "OUT")
    .reduce((acc, t) => acc + t.quantity, 0),
);

const recentMovementTrends = computed(() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, i) => ({
    label: day,
    in: Math.floor(Math.random() * 25) + i * 2,
    out: Math.floor(Math.random() * 18) + i * 3,
  }));
});

const maxTrendQty = computed(() => {
  return (
    Math.max(...recentMovementTrends.value.map((d) => Math.max(d.in, d.out))) ||
    50
  );
});

// --- HELPER UTILITIES ---
const formatCurrency = (val) =>
  Number(val || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const formatDate = (ts) => new Date(ts).toLocaleString();

const getStatusBadgeClass = (item) => {
  if (item.quantity === 0)
    return "bg-rose-500/10 text-rose-500 border-rose-500/30";
  if (item.quantity <= item.minThreshold)
    return "bg-amber-500/10 text-amber-500 border-amber-500/30";
  return "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
};

const getStatusLabel = (item) => {
  if (item.quantity === 0) return "Out of Stock";
  if (item.quantity <= item.minThreshold) return "Low Stock";
  return "In Stock";
};

const showToast = (message, type = "success") => {
  const id = Date.now();
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 3000);
};

// --- STREAMING_CHUNK:Writing CRUD functions and LocalStorage syncing... ---
// --- DATA PERSISTENCE & ACTIONS ---
const loadStorage = () => {
  const localProd = localStorage.getItem("stockpulse_products");
  products.value = localProd ? JSON.parse(localProd) : initialProducts;

  const localTx = localStorage.getItem("stockpulse_tx");
  transactions.value = localTx
    ? JSON.parse(localTx)
    : [
        {
          id: "tx-1",
          sku: "ELEC-9921",
          productName: 'Ultra-Wide Monitor 34"',
          type: "IN",
          quantity: 10,
          note: "Supplier Restock",
          timestamp: Date.now() - 3600000,
          actor: "Alex Parker",
        },
      ];
};

const saveStorage = () => {
  localStorage.setItem("stockpulse_products", JSON.stringify(products.value));
  localStorage.setItem("stockpulse_tx", JSON.stringify(transactions.value));
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "ALL";
  selectedStatus.value = "ALL";
  currentPage.value = 1;
};

// Product CRUD
const openAddProductModal = () => {
  isEditing.value = false;
  productForm.value = {
    id: null,
    name: "",
    sku: "",
    category: "Electronics",
    costPrice: 0,
    sellingPrice: 0,
    quantity: 0,
    minThreshold: 5,
  };
  showProductModal.value = true;
};

const openEditProductModal = (item) => {
  isEditing.value = true;
  productForm.value = { ...item };
  showProductModal.value = true;
};

const saveProduct = () => {
  if (isEditing.value) {
    const idx = products.value.findIndex((p) => p.id === productForm.value.id);
    if (idx !== -1) {
      products.value[idx] = { ...productForm.value };
      showToast("Product updated successfully");
    }
  } else {
    const newProduct = { ...productForm.value, id: Date.now().toString() };
    products.value.unshift(newProduct);

    // Auto-record initial stock movement
    if (newProduct.quantity > 0) {
      transactions.value.unshift({
        id: "tx-" + Date.now(),
        sku: newProduct.sku,
        productName: newProduct.name,
        type: "IN",
        quantity: newProduct.quantity,
        note: "Initial product creation",
        timestamp: Date.now(),
        actor: "Alex Parker",
      });
    }
    showToast("New product added to inventory");
  }
  saveStorage();
  showProductModal.value = false;
};

const deleteProduct = (item) => {
  if (confirm(`Delete "${item.name}"?`)) {
    products.value = products.value.filter((p) => p.id !== item.id);
    saveStorage();
    showToast("Product removed", "error");
  }
};

const quickAdjustQty = (item, delta) => {
  if (item.quantity + delta < 0) return;
  item.quantity += delta;

  transactions.value.unshift({
    id: "tx-" + Date.now(),
    sku: item.sku,
    productName: item.name,
    type: delta > 0 ? "IN" : "OUT",
    quantity: Math.abs(delta),
    note: "Quick table adjustment",
    timestamp: Date.now(),
    actor: "Alex Parker",
  });

  saveStorage();
  showToast(`Updated stock for ${item.name}`);
};

const openAdjustModal = (item) => {
  selectedProductForAdjust.value = item;
  adjustType.value = "IN";
  adjustQty.value = 10;
  adjustNote.value = "";
  showAdjustModal.value = true;
};

const saveStockAdjust = () => {
  if (!selectedProductForAdjust.value) return;
  const item = selectedProductForAdjust.value;
  const qty = adjustQty.value;

  if (adjustType.value === "OUT" && item.quantity < qty) {
    showToast("Error: Insufficient stock available!", "error");
    return;
  }

  item.quantity += adjustType.value === "IN" ? qty : -qty;

  transactions.value.unshift({
    id: "tx-" + Date.now(),
    sku: item.sku,
    productName: item.name,
    type: adjustType.value,
    quantity: qty,
    note: adjustNote.value || "Manual adjustment",
    timestamp: Date.now(),
    actor: "Alex Parker",
  });

  saveStorage();
  showToast("Stock movement recorded");
  showAdjustModal.value = false;
};

const resetToDefaultData = () => {
  products.value = [...initialProducts];
  transactions.value = [];
  saveStorage();
  showToast("Restored demo mock data");
};

const exportCSV = () => {
  const headers = [
    "ID",
    "SKU",
    "Name",
    "Category",
    "CostPrice",
    "SellingPrice",
    "Quantity",
    "MinThreshold",
  ];
  const rows = products.value.map((p) => [
    p.id,
    `"${p.sku}"`,
    `"${p.name}"`,
    `"${p.category}"`,
    p.costPrice,
    p.sellingPrice,
    p.quantity,
    p.minThreshold,
  ]);

  const content =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(content));
  link.setAttribute("download", `inventory_export_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Exported CSV file");
};

// Lifecycle
onMounted(() => {
  loadStorage();
});
</script>
