"use client";

import { AbilityDescription } from "@/components/ability-description";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAbilityDetails } from "@/hooks/use-ability-details";
import { formatPokemonName } from "@/lib/pokemon-utils";
import { Pokemon } from "@/types/pokemon";
interface PokemonInfoProps {
	pokemonDetails: Pokemon;
	isLoadingDetails: boolean;
	errorDetails: any;
}

export function PokemonInfo({
	pokemonDetails,
	isLoadingDetails,
	errorDetails,
}: PokemonInfoProps) {
	const { abilityDetails, isLoadingAbility, errorAbility } =
		useAbilityDetails("");

	return (
		<>
			{/* Pokemon Details */}
			{/* Pokemon Abilities */}
			<div className="mb-6">
				<div className="text-xl font-semibold text-gray-800 mb-4">
					Abilities
				</div>
				<div className="flex flex-col gap-5">
					{pokemonDetails.abilities?.map((ability) => (
						<div key={ability.ability.name} className="flex flex-col gap-2">
							<div className="flex gap-2">
								<Badge
									variant={ability.is_hidden ? "destructive" : "default"}
									className="text-xs"
								>
									{formatPokemonName(ability.ability.name)}
								</Badge>
								<Badge
									variant="outline"
									style={ability.is_hidden ? {} : { display: "none" }}
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
		</>
	);
}
