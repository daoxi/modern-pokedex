// This includes the details (e.g. damage relations) for pokemon types

"use client";

import { LoadingTypeDetails } from "@/components/loading-type-details";
import { Badge } from "@/components/ui/badge";
import { useTypeDetails } from "@/hooks/use-type-details";
import { formatPokemonName, getTypeColor } from "@/lib/pokemon-utils";

interface PokemonTypeDetailsProps {
	typeName: string;
}

export function PokemonTypeDetails({ typeName }: PokemonTypeDetailsProps) {
	// Get type details with custom hook
	const { typeDetails, isLoadingType, errorType } = useTypeDetails(typeName);

	// For converting an array of relevant pokemon types into <Badge>s
	const typesBadges = (types: { name: string; url: string }[]) => {
		return (
			<div className="flex gap-2 flex-wrap">
				{types.map((type) => (
					<Badge
						key={type.name}
						className="text-xs font-medium text-white px-3 py-1"
						style={{
							backgroundColor: getTypeColor(type.name),
						}}
					>
						{formatPokemonName(type.name)}
					</Badge>
				))}
			</div>
		);
	};

	return (
		<>
			{isLoadingType ? (
				<LoadingTypeDetails />
			) : typeDetails && typeDetails.damage_relations ? (
				<div>
					<Badge
						className="text-sm font-medium text-white px-4 py-2 mb-3"
						style={{
							backgroundColor: getTypeColor(typeName),
						}}
					>
						{formatPokemonName(typeName)}
					</Badge>

					{/* Conditionally output all damage relations that exist, with customized order and descriptions */}
					<div className="flex flex-col gap-2 text-gray-600">
						{typeDetails.damage_relations.double_damage_to.length > 0 && (
							<div>
								<div>2x damage to:</div>
								{typesBadges(typeDetails.damage_relations.double_damage_to)}
							</div>
						)}
						{typeDetails.damage_relations.half_damage_to.length > 0 && (
							<div>
								<div>½ damage to:</div>
								{typesBadges(typeDetails.damage_relations.half_damage_to)}
							</div>
						)}
						{typeDetails.damage_relations.no_damage_to.length > 0 && (
							<div>
								<div>0 damage to:</div>
								{typesBadges(typeDetails.damage_relations.no_damage_to)}
							</div>
						)}
						{typeDetails.damage_relations.double_damage_from.length > 0 && (
							<div>
								<div>2x damage from:</div>
								{typesBadges(typeDetails.damage_relations.double_damage_from)}
							</div>
						)}
						{typeDetails.damage_relations.half_damage_from.length > 0 && (
							<div>
								<div>½ damage from:</div>
								{typesBadges(typeDetails.damage_relations.half_damage_from)}
							</div>
						)}
						{typeDetails.damage_relations.no_damage_from.length > 0 && (
							<div>
								<div>0 damage from:</div>
								{typesBadges(typeDetails.damage_relations.no_damage_from)}
							</div>
						)}
					</div>
				</div>
			) : (
				<div>
					Failed to load type details
					{errorType && errorType.message && ": " + errorType.message}
				</div>
			)}
		</>
	);
}
