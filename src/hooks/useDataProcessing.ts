
import { useMemo } from 'react';
import type { 
  Team, 
  Club, 
  Competition, 
  Game, 
  Player, 
  NewsItem, 
  Event, 
  Referee, 
  Coach,
  Federation,
  RegionalAssociation
} from '@/types/backend';

interface UseDataProcessingProps {
  teamsData?: any[];
  clubsData?: any[];
  competitionsData?: any[];
  gamesData?: any[];
  playersData?: any[];
  newsData?: any[];
  eventsData?: any[];
  refereesData?: any[];
  federationsData?: any[];
  regionalAssociationsData?: any[];
}

export const useDataProcessing = ({
  teamsData = [],
  clubsData = [],
  competitionsData = [],
  gamesData = [],
  playersData = [],
  newsData = [],
  eventsData = [],
  refereesData = [],
  federationsData = [],
  regionalAssociationsData = []
}: UseDataProcessingProps) => {
  
  // Process teams data
  const teams = useMemo((): Team[] => {
    return teamsData.map(team => ({
      id: team.id,
      name: team.name,
      abbreviation: team.abbreviation,
      city: team.city,
      island: team.island,
      logo_url: team.logo_url,
      status: team.status,
      created_at: team.created_at,
      updated_at: team.updated_at
    }));
  }, [teamsData]);

  // Process clubs data
  const clubs = useMemo((): Club[] => {
    return clubsData.map(club => ({
      id: club.id,
      name: club.name,
      abbreviation: club.abbreviation,
      city: club.city,
      island: club.island,
      logo_url: club.logo_url,
      contact_email: club.contact_email,
      contact_phone: club.contact_phone,
      president_name: club.president_name,
      founded_year: club.founded_year,
      status: club.status,
      created_at: club.created_at,
      updated_at: club.updated_at
    }));
  }, [clubsData]);

  // Process competitions data
  const competitions = useMemo((): Competition[] => {
    return competitionsData.map(comp => ({
      id: comp.id,
      name: comp.name,
      type: comp.type,
      season: comp.season,
      start_date: comp.start_date,
      end_date: comp.end_date,
      description: comp.description,
      status: comp.status,
      logo_url: comp.logo_url,
      created_at: comp.created_at,
      updated_at: comp.updated_at
    }));
  }, [competitionsData]);

  // Process games data
  const games = useMemo((): Game[] => {
    return gamesData.map(game => ({
      id: game.id,
      championship_id: game.championship_id,
      home_team_id: game.home_team_id,
      away_team_id: game.away_team_id,
      game_date: game.game_date,
      venue: game.venue,
      round: game.round,
      home_score: game.home_score || 0,
      away_score: game.away_score || 0,
      status: game.status,
      created_at: game.created_at,
      updated_at: game.updated_at
    }));
  }, [gamesData]);

  // Process players data
  const players = useMemo((): Player[] => {
    return playersData.map(player => ({
      id: player.id,
      name: player.name,
      position: player.position,
      jersey_number: player.jersey_number,
      team_id: player.team_id,
      birth_date: player.birth_date,
      height_cm: player.height_cm,
      weight_kg: player.weight_kg,
      nationality: player.nationality,
      photo_url: player.photo_url,
      status: player.status,
      created_at: player.created_at,
      updated_at: player.updated_at
    }));
  }, [playersData]);

  // Process news data
  const news = useMemo((): NewsItem[] => {
    return newsData.map(newsItem => ({
      id: newsItem.id,
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt,
      author_id: newsItem.author_id,
      category: newsItem.category,
      image_url: newsItem.image_url,
      published: newsItem.published,
      featured: newsItem.featured,
      slug: newsItem.slug,
      views_count: newsItem.views_count || 0,
      created_at: newsItem.created_at,
      updated_at: newsItem.updated_at,
      published_at: newsItem.published_at
    }));
  }, [newsData]);

  // Process events data
  const events = useMemo((): Event[] => {
    return eventsData.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      location: event.location,
      event_type: event.event_type,
      status: event.status,
      created_by: event.created_by,
      created_at: event.created_at,
      updated_at: event.updated_at
    }));
  }, [eventsData]);

  // Process referees data
  const referees = useMemo((): Referee[] => {
    return refereesData.map(referee => ({
      id: referee.id,
      name: referee.name,
      license_number: referee.license_number,
      certification_level: referee.certification_level,
      contact_email: referee.contact_email,
      contact_phone: referee.contact_phone,
      island: referee.island,
      status: referee.status,
      created_at: referee.created_at,
      updated_at: referee.updated_at
    }));
  }, [refereesData]);

  // Process coaches data (from teams with coach info)
  const coaches = useMemo((): Coach[] => {
    // This would be populated from a separate coaches table or team relationships
    return [];
  }, []);

  // Process federations data
  const federations = useMemo((): Federation[] => {
    return federationsData.map(federation => ({
      id: federation.id,
      name: federation.name,
      country: federation.country,
      logo_url: federation.logo_url,
      website_url: federation.website_url,
      contact_email: federation.contact_email,
      partnership_type: federation.partnership_type,
      partnership_status: federation.partnership_status,
      created_at: federation.created_at,
      updated_at: federation.updated_at
    }));
  }, [federationsData]);

  // Process regional associations data
  const regionalAssociations = useMemo((): RegionalAssociation[] => {
    return regionalAssociationsData.map(association => ({
      id: association.id,
      name: association.name,
      island: association.island,
      president_name: association.president_name,
      contact_email: association.contact_email,
      contact_phone: association.contact_phone,
      address: association.address,
      clubs_count: association.clubs_count || 0,
      status: association.status,
      created_at: association.created_at,
      updated_at: association.updated_at
    }));
  }, [regionalAssociationsData]);

  return {
    teams,
    clubs,
    competitions,
    games,
    players,
    news,
    events,
    referees,
    coaches,
    federations,
    regionalAssociations
  };
};
