"use client";

import { PokemonInfoCard } from "@/components/pokemon-info-card";
import { usePokemonDetails } from "@/hooks/use-pokemon-details";
import { formatPokemonName } from "@/lib/pokemon-utils";
import { ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

//dynamic routing with pokemon id as parameter
export default function PokemonDetails({
	params,
}: {
	params: { pokemonId: number };
}) {
	//get pokemon details with custom hook
	const { pokemonDetails, isLoadingDetails, errorDetails } = usePokemonDetails(
		params.pokemonId.toString()
	);

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
				{/* Header */}
				<div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
					<div className="container mx-auto px-4 py-6">
						<div className="max-w-7xl flex items-center gap-5">
							{/* Back button */}
							<Link className="flex items-center  gap-1" href="/">
								<ArrowLeft className="h-5 w-5" />
								<div className="text-sm">Back</div>
							</Link>
							<div className="flex items-center gap-2">
								<Zap className="h-6 w-6 text-yellow-500" />
								<div className="flex items-end  gap-2">
									<div className="bg-gradient-to-r bg-clip-text text-transparent text-3xl font-bold from-blue-600 to-purple-600">
										{pokemonDetails
											? formatPokemonName(pokemonDetails.name)
											: "loading..."}
									</div>
									<div className="text-lg font-normal text-muted-foreground">
										#
										{pokemonDetails
											? pokemonDetails.id.toString().padStart(3, "0")
											: "???"}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Card section */}

				<div className="flex justify-center items-start px-3 py-6">
					<PokemonInfoCard
						pokemonId={params.pokemonId}
						pokemonDetails={pokemonDetails}
						isLoadingDetails={isLoadingDetails}
						errorDetails={errorDetails}
					/>
				</div>
			</div>
		</>
	);
}
