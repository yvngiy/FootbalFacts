const darkmode = document.querySelector('#darkmode');

const savedDarkMode = localStorage.getItem('darkmode') === 'true';
darkmode.checked = savedDarkMode;
document.body.classList.toggle('dark', savedDarkMode);

darkmode.addEventListener('change', () => {
    document.body.classList.toggle('dark', darkmode.checked);
    localStorage.setItem('darkmode', darkmode.checked);
});

const matchList = document.querySelector('#match-list');
const matchesApiUrl = '/api/matches';

function createMatchCard(match) {
    const card = document.createElement('article');
    card.className = 'match-card';

    const time = document.createElement('p');
    time.className = 'match-time';
    const timestamp = match.strTimestamp
        ? `${match.strTimestamp}${match.strTimestamp.endsWith('Z') ? '' : 'Z'}`
        : `${match.dateEvent}T${match.strTime || '00:00:00'}Z`;
    const matchDate = new Date(timestamp);
    time.textContent = `${matchDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })} • ${matchDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })} • PREMIER LEAGUE`;

    const teams = document.createElement('h3');
    const homeTeam = match.strHomeTeam || 'Gospodarze';
    const awayTeam = match.strAwayTeam || 'Goście';
    teams.append(homeTeam, ' ', Object.assign(document.createElement('span'), { textContent: 'vs' }), ' ', awayTeam);

    const badges = document.createElement('div');
    badges.className = 'team-badges';
    [match.strHomeTeamBadge, match.strAwayTeamBadge].forEach((badgeUrl) => {
        if (!badgeUrl) {
            return;
        }

        const badge = document.createElement('img');
        badge.src = badgeUrl;
        badge.alt = '';
        badge.loading = 'lazy';
        badges.append(badge);
    });

    const venue = document.createElement('p');
    venue.textContent = match.strVenue || 'Stadion nieznany';

    const preview = document.createElement('a');
    preview.href = '#news';
    preview.textContent = 'Przejdź do newsów →';
  

    card.append(time, badges, teams, venue, preview);
    return card;
}

async function loadMatches() {
    try {
        const response = await fetch(matchesApiUrl);
        if (!response.ok) {
            throw new Error('Nie udało się pobrać terminarza.');
        }

        const data = await response.json();
        const matches = (data.events || []).slice(0, 3);
        matchList.replaceChildren();

        if (matches.length === 0) {
            const emptyState = document.createElement('p');
            emptyState.className = 'match-loading';
            emptyState.textContent = 'Brak nadchodzących spotkań.';
            matchList.append(emptyState);
            return;
        }

        matches.forEach((match) => matchList.append(createMatchCard(match)));
    } catch (error) {
        matchList.replaceChildren();
        const errorState = document.createElement('p');
        errorState.className = 'match-loading';
        errorState.textContent = 'Nie udało się pobrać terminarza. Spróbuj ponownie później.';
        matchList.append(errorState);
    }
}

loadMatches();