export interface SpotifyUser {
	display_name: string;
	email: string;
	external_urls: {
		spotify: string;
	};
	id: string;
}

interface SpotifyImage {
	url: string;
	height: number;
	width: number;
}

export interface Artist {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
	images: SpotifyImage[];
}

export interface Track {
	album: Album;
	artists: Artist[];
	external_urls: {
		spotify: string;
	};
	id: string;
	name: string;
	type: string;
	is_local: boolean;
}

export interface Album {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	release_date: string;
	release_date_precision: string;
	type: string;
	uri: string;
	artists: Artist[];
	tracks: {
		href: string;
		limit: number;
		next: string;
		offset: number;
		previous: string;
		total: number;
		items: Track[];
	};
}

export interface Playlist {
	collaborative: boolean;
	description: ?string;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	owner: {
		display_name: string;
	};
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		limit: number;
		next: string;
		offset: ?number;
		previous: ?string;
		total: number;
		items: {
			added_at: string;
			added_by: {
				external_urls: {
					spotify: string;
				};
			};
			track: Track;
		};
	};
}
