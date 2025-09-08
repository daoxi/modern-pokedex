export interface Pokemon {
	id: number;
	name: string;
	url: string;
	sprites?: {
		front_default: string;
		other: {
			"official-artwork": {
				front_default: string;
			};
		};
	};
	abilities?: Array<{
		ability: {
			name: string;
			url: string;
		};
		is_hidden: boolean;
		slot: number;
	}>;
	types?: Array<{
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}>;
	stats?: Array<{
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}>;
	height?: number;
	weight?: number;
}

export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<{
		name: string;
		url: string;
	}>;
}

export interface DamageRelationType {
	name: string;
	url: string;
}

// For the types of pokemon, each pokemon may have up to 2 types
export interface Type {
	id: number;
	name: string;
	damage_relations: {
		double_damage_from: DamageRelationType[];
		double_damage_to: DamageRelationType[];
		half_damage_from: DamageRelationType[];
		half_damage_to: DamageRelationType[];
		no_damage_from: DamageRelationType[];
		no_damage_to: DamageRelationType[];
	};
	// The following will be provided by the API but they aren't used for now so they aren't all strictly typed yet
	/*
	game_indices: any[];
	generation: { name: string; url: string };
	move_damage_class: { name: string; url: string };
	moves: { name: string; url: string }[];
	names: { language: { name: string; url: string }; name: string }[];
	past_damage_relations: any[];
	pokemon: any[];
	sprites: any;
	*/
}

export interface Ability {
	id: number;
	name: string;
	effect_entries: Array<{
		effect: string;
		language: {
			name: string;
		};
	}>;
}
