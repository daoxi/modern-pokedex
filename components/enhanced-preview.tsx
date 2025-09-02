"use client";

import { LoadingPreview } from "@/components/loading-preview";
import { Badge } from "@/components/ui/badge";
import { usePokemonDetails } from "@/hooks/use-pokemon-details";
import { formatPokemonName, getTypeColor } from "@/lib/pokemon-utils";

interface EnhancedPreviewProps {
	pokemonId: number;
}

//using "default" export here to facilitate lazy loading import
export default function EnhancedPreview({ pokemonId }: EnhancedPreviewProps) {
	//get pokemon details with custom hook
	const { pokemonDetails, isLoadingDetails, errorDetails } = usePokemonDetails(
		pokemonId.toString()
	);

	return (
		<>
			<div>
				{isLoadingDetails ? (
					<LoadingPreview />
				) : pokemonDetails ? (
					<div>
						{/* Pokemon Type(s) */}
						<div className="flex justify-center items-center gap-2 mb-3">
							{pokemonDetails.types &&
								pokemonDetails.types.map((type) => (
									<Badge
										key={
											type.slot
										} /* mind the data structure returned by the Pokemon API, each "slot" number is paird with 1 type */
										className="text-xs font-medium text-white px-3 py-1 transition-all duration-300 hover:scale-110"
										style={{
											backgroundColor: getTypeColor(type.type.name),
										}}
									>
										{formatPokemonName(type.type.name)}
									</Badge>
								))}{" "}
						</div>
						{/* Pokemon Abilities */}
						<div>
							<div className="text-sm font-medium text-gray-600 mb-1">
								Abilities
							</div>
							<div
								className="flex flex-wrap justify-center items-center gap-2 mb-1"
								/* flex-wrap is used to allow ability badges to wrap onto multiple lines to allow enough space for each badge to display the entire name */
							>
								{pokemonDetails.abilities && (
									<>
										{/* including only the first 2 abilities */}
										{pokemonDetails.abilities.slice(0, 2).map((ability) => (
											<Badge
												key={
													ability.slot
												} /* mind the data structure returned by the Pokemon API, each "slot" number is paird with 1 ability */
												className="text-xs border-gray-300 text-gray-700 px-3 py-1 transition-all duration-300 hover:border-blue-400 hover:text-blue-600 truncate"
												variant="outline"
											>
												{formatPokemonName(ability.ability.name)}
											</Badge>
										))}
										{/* handle "+X more" badge below */}
										{pokemonDetails.abilities.length - 2 > 0 && (
											<Badge
												key={"more"}
												className="text-xs border-gray-300 text-gray-700 px-3 py-1 truncate"
												variant="outline"
											>
												+{pokemonDetails.abilities.length - 2} more
											</Badge>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				) : (
					<div>
						⚠ Error loading details{" "}
						{errorDetails && ": " + errorDetails.message}
					</div>
				)}
			</div>
		</>
	);
}
