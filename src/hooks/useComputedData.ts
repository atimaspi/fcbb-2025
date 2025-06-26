
import { useMemo } from 'react';
import type { NewsItem, Event, Game } from '@/types/backend';

export const useComputedData = (
  news: NewsItem[],
  events: Event[],
  games: Game[]
) => {
  // Published news only
  const publishedNews = useMemo(() => {
    return news.filter(item => item.published);
  }, [news]);

  // Active events (not cancelled)
  const activeEvents = useMemo(() => {
    return events.filter(event => event.status !== 'cancelado');
  }, [events]);

  // Upcoming games
  const upcomingGames = useMemo(() => {
    const now = new Date();
    return games.filter(game => {
      if (!game.scheduled_date) return false;
      const gameDate = new Date(game.scheduled_date);
      return gameDate > now && game.status === 'scheduled';
    }).slice(0, 5); // Get next 5 games
  }, [games]);

  // Recent games (completed)
  const recentGames = useMemo(() => {
    const now = new Date();
    return games.filter(game => {
      if (!game.scheduled_date) return false;
      const gameDate = new Date(game.scheduled_date);
      return gameDate <= now && game.status === 'finished';
    }).slice(0, 5); // Get last 5 completed games
  }, [games]);

  return {
    publishedNews,
    activeEvents,
    upcomingGames,
    recentGames
  };
};
