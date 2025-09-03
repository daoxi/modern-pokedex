// This component contains everything in the "Stats Chart" tab

"use client";

import { Pokemon } from "@/types/pokemon";

import { AbilityDescription } from "@/components/ability-description";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calculateAbilityEffect } from "@/lib/abilityEffects";
import { formatPokemonName } from "@/lib/pokemon-utils";
import { ChartColumn, Info, Zap } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	Legend,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface StatsChartProps {
	pokemonDetails: Pokemon; // Error handling for pokemonDetails has already been done in the parent component, so this can't be null or undefined
	selectedAbility: string;
	handleClickAbility: (name: string) => void;
}

export function StatsChart({
	pokemonDetails,
	selectedAbility,
	handleClickAbility,
}: StatsChartProps) {
	// The array for storing both base stats and modified stats
	const pokemonStats: { name: string; statBase: number; statMod: number }[] =
		[];
	// Construct said array
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

	// Calculate the Base Total and Modified Total here (instead of in-line with TSX),
	// so that they don't need to be calculated again when finding Net Change
	const baseTotal = pokemonStats.reduce(
		(sum, pokemonStat) => sum + pokemonStat.statBase,
		0
	);
	const modTotal = pokemonStats.reduce(
		(sum, pokemonStat) => sum + pokemonStat.statMod,
		0
	);

	const netChange = modTotal - baseTotal;

	// This includes all of the content displayed on the tooltip, completely overrides the default tooltip
	const CustomTooltip = (
		{
			active,
			payload,
			label,
		}: any /* Consider using types provided by Recharts: "TooltipProps<ValueType, NameType>" */
	) => {
		const isVisible = active && payload && payload.length; // Controls visibility of the tooltip, referenced from Recharts site
		return (
			<div style={{ visibility: isVisible ? "visible" : "hidden" }}>
				{isVisible && (
					<Card className="bg-white border border-gray-200 rounded-lg shadow-lg">
						<CardContent className="p-3">
							<div className="font-semibold text-gray-800 mb-2">
								{formatPokemonName(label)}
							</div>
							<div className="flex justify-between mb-1">
								<div className="text-blue-600">Base: </div>
								<div className="font-medium">{payload[0].value}</div>
							</div>

							<div className="flex justify-between mb-1">
								<div className="text-purple-600">Modified: </div>
								<div className="font-medium">{payload[1].value}</div>
							</div>

							{payload[1].value - payload[0].value != 0 && (
								/* hide this part if there's no stat change */
								<div className="flex justify-between mb-1">
									<div className="text-gray-600">Change: </div>
									<div
										className={`flex justify-end gap-1 font-medium ${
											payload[1].value - payload[0].value > 0
												? "text-green-600"
												: "text-red-600"
											/* Doesn't need to consider when there's 0 change, because then this part won't be rendered */
										}`}
									>
										<div>
											{payload[1].value - payload[0].value > 0 && "+"}
											{payload[1].value - payload[0].value}
										</div>
										<div>
											{"("}
											{payload[1].value - payload[0].value > 0 && "+"}
											{
												Math.round(
													((payload[1].value - payload[0].value) /
														payload[0].value) *
														100
												) /* convert for percentage display*/
											}
											{"%)"}
										</div>
									</div>
								</div>
							)}
							<Separator className="my-2" />
							{/* Ability Effect */}
							<div className="flex gap-1 items-center text-xs text-gray-600">
								<Info className="h-3 w-3" />
								{
									calculateAbilityEffect(
										selectedAbility,
										label,
										payload[0].value
									).effect
								}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		);
	};

	// Referred from CustomizedLabelLineChart example provided by Recharts
	// The label is rotated -35 degrees for better visibility and alignment with the axis
	const CustomizedAxisTick = (
		{
			x,
			y,
			stroke,
			payload,
		}: any /* Did not find a suitable type for props provided by Recharts (similar to TooltipProps), consider manual typing instead */
	) => {
		return (
			<g transform={`translate(${x},${y})`}>
				<text
					x={0}
					y={0}
					dy={16}
					textAnchor="end"
					fill="#6B7280" // Use this to change the X-axis text color
					transform="rotate(-35)"
					className="text-sm font-medium" // "text-gray-700" for "Stat Labels" is excluded because the "fill" prop is already used to color the SVG text
				>
					{
						formatPokemonName(
							payload.value
						) /* Format the stats name only when displaying X-axis texts, to keep the pokemon stats data intact */
					}
				</text>
			</g>
		);
	};

	return (
		<div>
			{/* Chart Title */}
			<div className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-6">
				<ChartColumn className="w-5 h-5 text-blue-500" />
				<div>Base Stats vs Ability Effects</div>
			</div>
			{/* Ability Buttons */}
			<div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
				<Zap className="h-4 w-4 text-gray-700" />
				<div>Select Ability</div>
			</div>
			<div className="flex flex-wrap gap-3 mb-4">
				{pokemonDetails.abilities &&
					pokemonDetails.abilities.map((ability) => (
						<Button
							key={
								ability.ability.name
							} /* Each ability name is unique, also mind the data structure returned by the PokeAPI. */
							onClick={() => handleClickAbility(ability.ability.name)}
							variant={
								ability.ability.name === selectedAbility ? "default" : "outline"
							}
						>
							<div className="flex gap-2">
								<div>{formatPokemonName(ability.ability.name)}</div>
								<Badge
									style={
										ability.is_hidden
											? {}
											: {
													display: "none",
											  } /* Don't show this badge if the ability is not a "hidden" type */
									}
									variant="secondary"
								>
									Hidden
								</Badge>
							</div>
						</Button>
					))}
			</div>
			{/* Ability Descriptions */}
			<Card className="bg-gray-50 border-none mb-12">
				<CardContent className="px-4 py-5">
					<div className="flex gap-2 mb-2">
						<div className="font-medium text-gray-800">
							{formatPokemonName(selectedAbility)}
						</div>
						<Badge
							style={
								pokemonDetails.abilities &&
								pokemonDetails.abilities.find(
									(ability) => ability.ability.name === selectedAbility
								)?.is_hidden
									? {}
									: {
											display: "none",
									  } /* Don't show this badge if the ability is not a "hidden" type */
							}
							variant="outline"
						>
							Hidden Ability
						</Badge>
					</div>
					<div className="text-sm text-gray-600">
						<AbilityDescription abilityName={selectedAbility} />
					</div>
				</CardContent>
			</Card>
			{/* Stats Chart */}
			<div className="container h-[320px] mb-16">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={pokemonStats}
						margin={{
							top: 0,
							left: 2, // Needs a tiny bit of margin for the rotated Y-axis label text to not be partially/slightly cropped out
							right: 2, // Symmetrical to the left
							bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
						<XAxis
							//angle={-45} // This rotates texts without adjusting position accordingly, which causes those texts to overlap with chart, thus not useful for texts.
							dataKey="name"
							tick={
								<CustomizedAxisTick /> /* Use this to customize axis texts, especially to rotate them */
							}
							height={
								105
							} /* Bump X-axis up to avoid X-axis angled texts overlapping with the legend, this approach is used in Recharts' official example */
							interval={0} // Use this to always show all ticks (i.e. X-axis texts) even on the narrowest screen
						/>
						<YAxis
							tick={{
								fill: "#6B7280",
							}} /* Use this to change the Y-axis text color */
						>
							<Label
								value="Stat Value"
								angle={-90} // Rotate for vertical label
								position="insideLeft"
								style={{ textAnchor: "middle" }} // For text alignment
							/>
						</YAxis>
						<Tooltip content={CustomTooltip} />
						<Legend />
						<Bar
							dataKey="statBase"
							fill="#3B82F6"
							activeBar={<Rectangle fill="blue" stroke="blue" />}
							name="Base Stat" // Component will use dataKey as name if this isn't defined
						/>
						<Bar
							dataKey="statMod"
							fill="#8B5CF6"
							activeBar={<Rectangle fill="purple" stroke="purple" />}
							name="Ability Modified" // Component will use dataKey as name if this isn't defined
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
			{/* Stats Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center font-bold mb-6">
				<Card className="bg-blue-50 border-none">
					<CardContent className="py-4">
						<div className="mb-1 text-blue-800">Base Total</div>
						<div className="text-2xl text-blue-600">{baseTotal}</div>
					</CardContent>
				</Card>
				<Card className="bg-purple-50 border-none">
					<CardContent className="py-4">
						<div className="mb-1 text-purple-800">Modified Total</div>
						<div className="text-2xl text-purple-600">{modTotal}</div>
					</CardContent>
				</Card>
				<Card className="bg-gray-50 border-none">
					<CardContent className="py-4">
						<div className="mb-1 text-gray-800">Net Change</div>
						<div
							className={`text-2xl ${
								netChange > 0
									? "text-green-600"
									: netChange < 0
									? "text-red-600"
									: "text-gray-600" // If change is 0
							}`}
						>
							{netChange > 0
								? "+" + netChange /* Add plus sign for positive numbers */
								: netChange}
						</div>
					</CardContent>
				</Card>
			</div>
			{/* Addtional Note */}
			<div className="text-xs text-gray-400">
				<b>Note:</b> Ability effects shown are theoretical and may depend on
				battle conditions, status effects, weather, or other factors not
				represented in this chart. <br /> Hover over bars to see detailed stat
				information and ability effects.
			</div>
		</div>
	);
}
