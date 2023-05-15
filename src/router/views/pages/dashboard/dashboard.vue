<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'

import StatChart from '@components/widget-stat-chart'
import Overview from '@components/overview'
import Member from '@components/member'
import Task from '@components/task'
import Chat from '@components/chat'

import {
	revenueAreaChart,
	targetsBarChart,
	salesDonutChart,
	ordersData,
	sexoChart,
	categoriaChart
} from './data'

/**
 * Dashboard-1 Component
 */
export default {
	page: {
		title: 'Dashboard',
		meta: [{ name: 'description', content: appConfig.description }],
	},
	components: {
		VuePerfectScrollbar,
		Layout,
		StatChart,
		Overview,
		Member,
		Task,
		Chat,
	},
	data() {
		return {
			revenueAreaChart: revenueAreaChart,
			targetsBarChart: targetsBarChart,
			salesDonutChart: salesDonutChart,
			ordersData: ordersData,
			sexoChart: sexoChart,
			categoriaChart: categoriaChart,

			maxHeight: '328px',
			overviewData: [
				{
					class: 'border-bottom py-4',
					icon: 'users',
					value: '121,000',
					title: 'Total Visitors',
				},
				{
					class: 'border-bottom py-4',
					icon: 'image',
					value: '21,000',
					title: 'Total Product Views',
				},
				{
					class: 'py-4',
					icon: 'shopping-bag',
					value: '$21.5',
					title: 'Revenue Per Visitor',
				},
			],
			
			
			statChart: [
				{
					mainTitle: 'Total de Animais',
					value: 560,
					subValue: '10.21%',
					chartColor: '#43d39e',
				},
				{
					mainTitle: '@ Produzidas',
					value: 1369,
					subValue: '15.05%',
					chartColor: '#43d39e',
				},
				{
					mainTitle: 'GMD Global (Kg)',
					value: 0.735,
					subValue: '6.16%',
					chartColor: '#43d39e',
				},
				{
					mainTitle: 'Peso Total (Kg)',
					value: '179.200,98',
					subValue: '9.05%',
					chartColor: '#43d39e',
				},
			],
			
			dateConfig: {
				mode: 'range',
			},
			selectedDate: [new Date().setDate(new Date().getDate() - 7), new Date()],
		}
	},
}
</script>

<template>
	<Layout>
		<div class="row page-title align-items-center">
			<div class="col-sm-4 col-xl-6">
				<h4 class="mb-1 mt-0">Dashboard</h4>
			</div>
		</div>

		<div class="row">
			<div
				v-for="stat of statChart"
				:key="stat.mainTitle"
				class="col-md-6 col-xl-3"
			>
				<StatChart
					:main-title="stat.mainTitle"
					:value="stat.value"
					:sub-value="stat.subValue"
					:chart-color="stat.chartColor"
				/>
			</div>
		</div>

		

		<div class="row">
			<div class="col-xl-4">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title mt-0 pb-2 header-title">Raças</h5>
						<!-- Sales donut chart -->
						<apexchart
							type="donut"
							height="304"
							:series="salesDonutChart.series"
							:options="salesDonutChart.chartOptions"
						></apexchart>
						<!-- end sales chart -->
					</div>
				</div>
			</div>

			<div class="col-xl-4">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title mt-0 pb-2 header-title">Sexo</h5>
						<!-- Sales donut chart -->
						<apexchart
							type="donut"
							height="304"
							:series="sexoChart.series"
							:options="sexoChart.chartOptions"
						></apexchart>
						<!-- end sales chart -->
					</div>
				</div>
			</div>

			<div class="col-xl-4">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title mt-0 pb-2 header-title">Fase Vida</h5>
						<!-- Sales donut chart -->
						<apexchart
							type="donut"
							height="304"
							:series="categoriaChart.series"
							:options="categoriaChart.chartOptions"
						></apexchart>
						<!-- end sales chart -->
					</div>
				</div>
			</div>
			
		</div>

		
	</Layout>
</template>
