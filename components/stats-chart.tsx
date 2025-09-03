"use client";

import { Pokemon } from "@/types/pokemon";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { calculateAbilityEffect } from "@/lib/abilityEffects";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface StatsChartProps {
	pokemonDetails: Pokemon; // Error handling for pokemonDetails has already been done in the parent component, so this can't be null or undefined
	isLoadingDetails: boolean;
	errorDetails: any;
	selectedAbility: string;
	handleClickAbility: (name: string) => void;
}

export function StatsChart({
	pokemonDetails,
	isLoadingDetails,
	errorDetails,
	selectedAbility,
	handleClickAbility,
}: StatsChartProps) {
	const pokemonStats: { name: string; statBase: number; statMod: number }[] =
		[];

	if (pokemonDetails.stats) {
		pokemonDetails.stats.forEach((stat) => {
			pokemonStats.push({
				name: stat.stat.name,
				statBase: stat.base_stat,
				statMod: calculateAbilityEffect(
					selectedAbility,
					stat.stat.name,
					stat.base_stat
				).modified,
			});
		});
	}

	// From Recharts official example
	const data = [
		{
			name: "Page A",
			uv: 4000,
			pv: 2400,
		},
		{
			name: "Page B",
			uv: 3000,
			pv: 1398,
		},
		{
			name: "Page C",
			uv: 2000,
			pv: 9800,
		},
		{
			name: "Page D",
			uv: 2780,
			pv: 3908,
		},
		{
			name: "Page E",
			uv: 1890,
			pv: 4800,
		},
		{
			name: "Page F",
			uv: 2390,
			pv: 3800,
		},
		{
			name: "Page G",
			uv: 3490,
			pv: 4300,
		},
	];

	return (
		<div>
			{/* Ability Buttons */}
			<div className="flex gap-2">
				{pokemonDetails.abilities &&
					pokemonDetails.abilities.map((ability) => (
						<Button
							key={
								ability.ability.name
							} /* Each ability name is unique, also mind the data structure returned by the PokeAPI. */
							onClick={() => handleClickAbility(ability.ability.name)}
						>
							{ability.ability.name}
						</Button>
					))}
				<div>Selected: {selectedAbility}</div>
			</div>
			<div className="container h-[320px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={pokemonStats}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar
							dataKey="statBase"
							fill="#8884d8"
							activeBar={<Rectangle fill="pink" stroke="blue" />}
						/>
						<Bar
							dataKey="statMod"
							fill="#82ca9d"
							activeBar={<Rectangle fill="gold" stroke="purple" />}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
				<Card>
					<CardHeader>Base Total</CardHeader>
					<CardContent>......</CardContent>
				</Card>
				<Card>
					<CardHeader>Modified Total</CardHeader>
					<CardContent>......</CardContent>
				</Card>
				<Card>
					<CardHeader>Net Change</CardHeader>
					<CardContent>......</CardContent>
				</Card>
			</div>
		</div>
	);
}
