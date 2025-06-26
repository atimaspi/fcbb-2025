
import { useBackendOperations } from './useBackendOperations';
import { useClubsData } from './data/useClubsData';
import { useTeamsData } from './data/useTeamsData';
import { usePlayersData } from './data/usePlayersData';
import { useGamesData } from './data/useGamesData';
import { useNewsData } from './data/useNewsData';
import { useEventsData } from './data/useEventsData';
import { useRefereesData } from './data/useRefereesData';
import { useCoachesData } from './data/useCoachesData';
import { useCompetitionsData } from './data/useCompetitionsData';
import { useFederationsData } from './data/useFederationsData';
import { useRegionalAssociationsData } from './data/useRegionalAssociationsData';

// Re-export types for components to use
export type { 
  Game, 
  Team, 
  Player, 
  NewsItem, 
  Event, 
  Referee, 
  Coach,
  Competition,
  Federation,
  RegionalAssociation,
  Club
} from '@/types/backend';

export const useBackendData = () => {
  const { operations } = useBackendOperations();

  // Use individual data hooks
  const { clubs, clubsLoading, clubsError, refetchClubs } = useClubsData();
  const { teams, teamsLoading, teamsError, refetchTeams } = useTeamsData();
  const { players, playersLoading, playersError, refetchPlayers } = usePlayersData();
  const { games, upcomingGames, recentGames, gamesLoading, gamesError, refetchGames } = useGamesData();
  const { news, publishedNews, newsData, newsLoading, newsError, refetchNews } = useNewsData();
  const { events, activeEvents, eventsData, eventsLoading, eventsError, refetchEvents } = useEventsData();
  const { referees, refereesLoading, refereesError, refetchReferees } = useRefereesData();
  const { coaches, coachesLoading, coachesError, refetchCoaches } = useCoachesData();
  const { competitions, competitionsLoading, competitionsError, refetchCompetitions } = useCompetitionsData();
  const { federations, federationsLoading, federationsError, refetchFederations } = useFederationsData();
  const { regionalAssociations, regionalAssociationsLoading, regionalAssociationsError, refetchRegionalAssociations } = useRegionalAssociationsData();

  const isLoading = clubsLoading || teamsLoading || playersLoading || gamesLoading || 
                   newsLoading || eventsLoading || refereesLoading || coachesLoading ||
                   competitionsLoading || federationsLoading || regionalAssociationsLoading;

  return {
    // Data
    clubs,
    teams,
    players,
    games,
    upcomingGames,
    recentGames,
    news,
    events,
    referees,
    coaches,
    competitions,
    federations,
    regionalAssociations,
    
    // Computed data
    publishedNews,
    activeEvents,
    
    // Data aliases for backward compatibility
    newsData,
    eventsData,
    
    // Loading states
    isLoading,
    clubsLoading,
    teamsLoading,
    playersLoading,
    gamesLoading,
    newsLoading,
    eventsLoading,
    refereesLoading,
    coachesLoading,
    competitionsLoading,
    federationsLoading,
    regionalAssociationsLoading,
    
    // Error states
    clubsError,
    teamsError,
    playersError,
    gamesError,
    newsError,
    eventsError,
    refereesError,
    coachesError,
    competitionsError,
    federationsError,
    regionalAssociationsError,
    
    // Refetch functions
    refetchClubs,
    refetchTeams,
    refetchPlayers,
    refetchGames,
    refetchNews,
    refetchEvents,
    refetchReferees,
    refetchCoaches,
    refetchCompetitions,
    refetchFederations,
    refetchRegionalAssociations,
    
    // Operations
    operations
  };
};
