// This component contains everything within the tabbed interface (for details and stats charts, etc.)

"use client";

import { AbilityDescription } from "@/components/ability-description";
import { StatsChart } from "@/components/stats-chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAbilityDetails } from "@/hooks/use-ability-details";
import { formatPokemonName } from "@/lib/pokemon-utils";
import { Pokemon } from "@/types/pokemon";
import { Info, TrendingUp } from "lucide-react";
import { useState } from "react";

interface PokemonInfoProps {
	pokemonDetails: Pokemon; // Error handling for pokemonDetails has already been done in the parent component, so this can't be null or undefined
	isLoadingDetails: boolean;
	errorDetails: any;
}

export function PokemonInfo({
	pokemonDetails,
	isLoadingDetails,
	errorDetails,
}: PokemonInfoProps) {
	// Use custom hook to get ability details (after pokemon details are ready)
	const { abilityDetails, isLoadingAbility, errorAbility } =
		useAbilityDetails("");

	// The following state is lifted up to this parent component in order to preserve state during component lifecycle
	// (In other words, switching tabs in <Tabs> won't reset selectedAbility)
	const [selectedAbility, setSelectedAbility] = useState(
		pokemonDetails.abilities ? pokemonDetails.abilities[0].ability.name : ""
	);

	const handleClickAbility = (name: string) => {
		setSelectedAbility(name);
	};

	return (
		<>
			{/* Pokemon Extra Details (within Tabs) e.g. Stats and Charts */}
			<Tabs defaultValue="tab-1">
				<TabsList className="container mb-6">
					<TabsTrigger value="tab-1" className="container">
						<div className="flex gap-2">
							<Info className="h-5 w-5" />
							<div>Details</div>
						</div>
					</TabsTrigger>
					<TabsTrigger value="tab-2" className="container">
						<div className="flex gap-2">
							<TrendingUp className="h-5 w-5" />
							<div>Stats Chart</div>
						</div>
					</TabsTrigger>
				</TabsList>
				<Card className="container bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
					<CardContent className="px-6 py-6">
						<TabsContent value="tab-1">
							{/* Pokemon Abilities */}
							<div className="mb-6">
								<div className="text-xl font-semibold text-gray-800 mb-4">
									Abilities
								</div>
								<div className="flex flex-col gap-5">
									{pokemonDetails.abilities &&
										pokemonDetails.abilities.map((ability) => (
											<div
												key={
													ability.ability.name
												} /* Each ability name is unique, also mind the data structure returned by the PokeAPI. */
												className="flex flex-col gap-2"
											>
												<div className="flex gap-2">
													<Badge
														variant={
															ability.is_hidden ? "destructive" : "default"
														}
														className="text-xs"
													>
														{formatPokemonName(ability.ability.name)}
													</Badge>
													<Badge
														variant="outline"
														style={
															ability.is_hidden
																? {}
																: {
																		display: "none",
																  } /* Don't show this badge if the ability is not a "hidden" type */
														}
														className="text-xs"
													>
														Hidden
													</Badge>
												</div>
												<div className="text-sm text-muted-foreground">
													<AbilityDescription
														abilityName={ability.ability.name}
														isLoadingDetails={isLoadingDetails}
														errorDetails={errorDetails}
													/>
												</div>
											</div>
										))}
								</div>
							</div>
							{/* Pokemon Stats */}
							<div>
								<div className="text-xl font-semibold text-gray-800 mb-4">
									Base Stats
								</div>
								<div>
									<div className="flex flex-col">
										{pokemonDetails.stats &&
											pokemonDetails.stats.map((stat) => (
												<div key={stat.stat.name} className="mb-5">
													<div className="flex justify-between mb-2">
														<div className="font-medium text-gray-700">
															{formatPokemonName(stat.stat.name)}
														</div>
														<div className="font-bold text-gray-800">
															{stat.base_stat}
														</div>
													</div>
													<Progress value={(stat.base_stat / 255) * 100} />
												</div>
											))}
									</div>
								</div>
							</div>
						</TabsContent>
						{/* Stats Charts and more */}
						<TabsContent value="tab-2">
							<StatsChart
								pokemonDetails={pokemonDetails}
								selectedAbility={selectedAbility}
								handleClickAbility={handleClickAbility}
							/>
						</TabsContent>
					</CardContent>
				</Card>
			</Tabs>
		</>
	);
}
