
import { useApi } from './useApi';

// Simple wrapper for backend operations
export const useBackendOperations = () => {
  const api = useApi();

  const operations = {
    clubs: {
      create: api.useCreate('clubs'),
      update: api.useUpdate('clubs'),
      delete: api.useDelete('clubs')
    },
    teams: {
      create: api.useCreate('teams'),
      update: api.useUpdate('teams'),
      delete: api.useDelete('teams')
    },
    players: {
      create: api.useCreate('players'),
      update: api.useUpdate('players'),
      delete: api.useDelete('players')
    },
    games: {
      create: api.useCreate('games'),
      update: api.useUpdate('games'),
      delete: api.useDelete('games')
    },
    news: {
      create: api.useCreate('news'),
      update: api.useUpdate('news'),
      delete: api.useDelete('news')
    },
    events: {
      create: api.useCreate('events'),
      update: api.useUpdate('events'),
      delete: api.useDelete('events')
    },
    referees: {
      create: api.useCreate('referees'),
      update: api.useUpdate('referees'),
      delete: api.useDelete('referees')
    },
    federations: {
      create: api.useCreate('federations'),
      update: api.useUpdate('federations'),
      delete: api.useDelete('federations')
    },
    regionalAssociations: {
      create: api.useCreate('regional_associations'),
      update: api.useUpdate('regional_associations'),
      delete: api.useDelete('regional_associations')
    },
    championships: {
      create: api.useCreate('championships'),
      update: api.useUpdate('championships'),
      delete: api.useDelete('championships')
    },
    partners: {
      create: api.useCreate('partners'),
      update: api.useUpdate('partners'),
      delete: api.useDelete('partners')
    },
    heroSlides: {
      create: api.useCreate('hero_slides'),
      update: api.useUpdate('hero_slides'),
      delete: api.useDelete('hero_slides')
    },
    basketballStats: {
      create: api.useCreate('basketball_stats'),
      update: api.useUpdate('basketball_stats'),
      delete: api.useDelete('basketball_stats')
    }
  };

  return { operations };
};
