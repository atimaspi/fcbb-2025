
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
      category: team.category || 'senior',
      division: team.division,
      club_id: team.club_id,
      created_at: team.created_at,
      abbreviation: team.abbreviation,
      city: team.city,
      island: team.island,
      logo_url: team.logo_url,
      status: team.status || 'ativo',
      updated_at: team.updated_at || team.created_at
    }));
  }, [teamsData]);

  // Process clubs data
  const clubs = useMemo((): Club[] => {
    return clubsData.map(club => ({
      id: club.id,
      name: club.name,
      island: club.island,
      active: club.active !== false,
      created_at: club.created_at,
      regional_association_id: club.regional_association_id,
      gallery_images: club.gallery_images,
      documents: club.documents,
      status: club.status,
      website: club.website,
      address: club.address,
      contact_phone: club.contact_phone,
      contact_email: club.contact_email,
      description: club.description,
      logo_url: club.logo_url,
      founded_year: club.founded_year,
      abbreviation: club.abbreviation,
      city: club.city,
      president_name: club.president_name,
      updated_at: club.updated_at || club.created_at
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
      updated_at: comp.updated_at || comp.created_at
    }));
  }, [competitionsData]);

  // Process games data
  const games = useMemo((): Game[] => {
    return gamesData.map(game => ({
      id: game.id,
      competition_id: game.championship_id || game.competition_id,
      home_team_id: game.home_team_id,
      away_team_id: game.away_team_id,
      scheduled_date: game.game_date || game.scheduled_date,
      venue: game.venue,
      round: game.round,
      home_score: game.home_score || 0,
      away_score: game.away_score || 0,
      status: game.status,
      created_at: game.created_at,
      game_date: game.game_date,
      updated_at: game.updated_at || game.created_at
    }));
  }, [gamesData]);

  // Process players data
  const players = useMemo((): Player[] => {
    return playersData.map(player => ({
      id: player.id,
      first_name: player.first_name || player.name?.split(' ')[0] || '',
      last_name: player.last_name || player.name?.split(' ').slice(1).join(' ') || '',
      position: player.position,
      jersey_number: player.jersey_number,
      team_id: player.team_id,
      birth_date: player.birth_date,
      age: player.age,
      height_cm: player.height_cm,
      weight_kg: player.weight_kg,
      nationality: player.nationality,
      photo_url: player.photo_url,
      status: player.status,
      club: player.club,
      active: player.active !== false,
      documents: player.documents,
      created_at: player.created_at,
      name: player.name || `${player.first_name || ''} ${player.last_name || ''}`.trim(),
      updated_at: player.updated_at || player.created_at
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
      author: newsItem.author || 'Admin',
      category: newsItem.category,
      image_url: newsItem.image_url,
      published: newsItem.published,
      featured: newsItem.featured,
      slug: newsItem.slug,
      views_count: newsItem.views_count || 0,
      created_at: newsItem.created_at,
      updated_at: newsItem.updated_at || newsItem.created_at,
      published_at: newsItem.published_at,
      featured_image_url: newsItem.featured_image_url,
      tags: newsItem.tags,
      video_url: newsItem.video_url,
      attachments: newsItem.attachments,
      gallery_images: newsItem.gallery_images,
      status: newsItem.status
    }));
  }, [newsData]);

  // Process events data
  const events = useMemo((): Event[] => {
    return eventsData.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      end_date: event.end_date,
      location: event.location,
      type: event.type || event.event_type || 'meeting',
      organizer: event.organizer,
      created_at: event.created_at,
      event_type: event.event_type || 'evento_social',
      status: event.status || 'agendado',
      created_by: event.created_by,
      updated_at: event.updated_at || event.created_at
    }));
  }, [eventsData]);

  // Process referees data
  const referees = useMemo((): Referee[] => {
    return refereesData.map(referee => ({
      id: referee.id,
      first_name: referee.first_name || referee.name?.split(' ')[0] || '',
      last_name: referee.last_name || referee.name?.split(' ').slice(1).join(' ') || '',
      license_number: referee.license_number,
      level: referee.level || referee.certification_level || 'regional',
      contact_email: referee.contact_email,
      contact_phone: referee.contact_phone,
      phone: referee.phone,
      email: referee.email,
      island: referee.island,
      active: referee.active !== false,
      certified_date: referee.certified_date,
      certificates: referee.certificates,
      photo_url: referee.photo_url,
      created_at: referee.created_at,
      name: referee.name || `${referee.first_name || ''} ${referee.last_name || ''}`.trim(),
      certification_level: referee.certification_level,
      status: referee.status || 'ativo',
      updated_at: referee.updated_at || referee.created_at
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
      acronym: federation.acronym,
      logo_url: federation.logo_url,
      website: federation.website_url || federation.website,
      address: federation.address,
      contact_email: federation.contact_email,
      contact_phone: federation.contact_phone,
      foundation_date: federation.foundation_date,
      created_at: federation.created_at,
      updated_at: federation.updated_at || federation.created_at,
      country: federation.country || 'Cabo Verde',
      partnership_type: federation.partnership_type,
      partnership_status: federation.partnership_status || 'ativo'
    }));
  }, [federationsData]);

  // Process regional associations data
  const regionalAssociations = useMemo((): RegionalAssociation[] => {
    return regionalAssociationsData.map(association => ({
      id: association.id,
      name: association.name,
      island: association.island,
      acronym: association.acronym,
      federation_id: association.federation_id || '',
      contact_email: association.contact_email,
      contact_phone: association.contact_phone,
      address: association.address,
      logo_url: association.logo_url,
      created_at: association.created_at,
      updated_at: association.updated_at || association.created_at,
      president_name: association.president_name,
      clubs_count: association.clubs_count || 0,
      status: association.status || 'ativo'
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
