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

export interface TrackItems {
	disc_number: number;
	album: Album;
	artists: Artist[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	track_number: number;
	type: string;
	uri: string;
    duration_ms: number;
}

export interface TrackResponse {
	added_at: string;
	added_by: {
		external_urls: {
			spotify: string;
		};
	};
	video_thumbnail: {
		url: string;
	};
	items: {
		added_at: string;
		added_by: {
			external_urls: {
				spotify: string;
			};
		};
		video_thumbnail: {
			url: string;
		};
		track: TrackItems;
	}[];
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
		items: TrackResponse[];
	};
}

export interface PlaylistItems {
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
	tracks: {
		href: string;
		total: number;
	};
}

export interface UserPlaylistsResponse {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: PlaylistItems[];
}

export interface PlaylistResponse {
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
	items: PlaylistItems[];
}

export interface PlaylistItemsResponse {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: {
		added_at: string;
		added_by: {
			external_urls: {
				spotify: string;
			};
		};
		track: TrackItems;
	}[];
}

export interface SavedUserTrackResponse {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: {
		added_at: string;
		track: TrackItems;
	}[];
}
