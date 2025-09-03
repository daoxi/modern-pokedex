"use client";

import { LoadingDetails } from "@/components/loading-details";
import { PokemonInfo } from "@/components/pokemon-info";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	formatPokemonName,
	getPokemonImageUrl,
	getTypeColor,
} from "@/lib/pokemon-utils";
import { Pokemon } from "@/types/pokemon";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PokemonInfoCardProps {
	pokemonId: number;
	pokemonDetails: Pokemon | null | undefined;
	isLoadingDetails: boolean;
	errorDetails: any;
}

export function PokemonInfoCard({
	pokemonId,
	pokemonDetails,
	isLoadingDetails,
	errorDetails,
}: PokemonInfoCardProps) {
	// Initialize and manage image load states
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const handleImageError = () => {
		setImageLoaded(true);
		setImageError(true);
	};

	return (
		<>
			<Card className="container max-w-5xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
				<CardContent className="px-6 py-6 flex-col gap-1 justify-start items-center">
					{/* Pokemon Image */}
					<div className="relative w-48 h-48 mx-auto mb-7">
						{!imageLoaded && (
							<>
								<Skeleton className="absolute inset-0 rounded-full" />
								<div className="flex items-center justify-center h-full">
									<Loader className="h-12 w-12" />
								</div>
							</>
						)}
						<div
							className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full ${
								imageLoaded && !imageError ? "opacity-100" : "opacity-0" // Only display background when image loaded successfully
							}`}
						/>
						{!imageError ? (
							<Image
								src={getPokemonImageUrl(pokemonId)} // Pokemon image can be loaded before pokemon details are ready, thanks to pokemon ID obtained from route parameters
								alt={formatPokemonName(
									pokemonDetails ? pokemonDetails.name : "pokemon"
								)}
								priority // Used for Largest Contentful Paint (LCP)
								fill
								sizes="(max-width: 475px) 100vw"
								//unoptimized // Used if need to serve the image as-is (i.e. without converting)
								className={`object-contain transition-all duration-300 ${
									imageLoaded ? "opacity-100" : "opacity-0"
								}`}
								onLoad={handleImageLoad}
								onError={handleImageError}
							/>
						) : (
							<div className="flex items-center justify-center h-full gap-2">
								<div>⚠ Failed to load Pokémon image</div>
							</div>
						)}
					</div>
					{/* Pokemon Details and More */}
					{isLoadingDetails ? (
						<LoadingDetails />
					) : !pokemonDetails ? (
						<div>
							⚠ Loading Pokémon details returned error
							{errorDetails.message && ": " + errorDetails.message}
						</div>
					) : (
						<div>
							{/* Pokemon Height and Weight */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 mb-7">
								<div className="flex flex-col justify-start items-center">
									<div className="text-sm text-muted-foreground">Height</div>
									<div className="text-2xl font-bold text-gray-800">
										{
											pokemonDetails.height
												? pokemonDetails.height / 10
												: "?" /* Consider height might not always be known */
										}{" "}
										m
									</div>
								</div>
								<div className="flex flex-col justify-start items-center">
									<div className="text-sm text-muted-foreground">Weight</div>
									<div className="text-2xl font-bold text-gray-800">
										{
											pokemonDetails.weight
												? pokemonDetails.weight / 10
												: "?" /* Consider weight might not always be known */
										}{" "}
										kg
									</div>
								</div>
							</div>
							{/* Pokemon Type(s) */}
							<div className="flex justify-center items-center gap-3 mb-10">
								{pokemonDetails.types &&
									pokemonDetails.types.map((type) => (
										<Badge
											key={
												type.type.name
											} /* Each type name is unique, also mind the data structure returned by the PokeAPI. */
											className="text-base font-medium text-white px-5 py-2"
											style={{
												backgroundColor: getTypeColor(type.type.name),
											}}
										>
											{formatPokemonName(type.type.name)}
										</Badge>
									))}
							</div>
							<PokemonInfo
								pokemonDetails={pokemonDetails}
								isLoadingDetails={isLoadingDetails}
								errorDetails={errorDetails}
							/>
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
}
