module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    var body = {
      name: 'API Craft Conference',
      version: '2.0',
      start: 'Tue Jul 29 2013 08:00:00 GMT-0400 (EDT)',
      end: 'Wed Jul 30 2013 19:00:00 GMT-0400 (EDT)',
      theme: 'From API Design to App Development',
      location: {
        city: 'Detroit',
        display_address: [ '130 E Atwater St', 'Downtown Detroit', 'Detroit, MI 48226' ],
        geo_accuracy: 8,
        neighborhoods: [ 'Downtown Detroit' ],
        postal_code: '48226',
        country_code: 'US',
        address: [ '130 E Atwater St' ],
        coordinate: { latitude:  42.327278, longitude: -83.041668 },
        state_code: 'MI'
      },
      format: 'Open Space <http://en.wikipedia.org/wiki/Open-space_technology>',
      links: [
        { rel: 'self', href: env.helpers.uri('/conferences/') + env.config.location }
      ]
    };

    var rels = ['goals', 'guidelines', 'agenda', 'attendees',
                'hotels', 'sessions', 'parties', 'questions', 'transit'];

    rels.forEach(function(rel) {
      body.links.push({
        rel: env.helpers.rel(rel),
        href: env.helpers.uri('/conferences/' + env.config.location + '/' + rel)
      });
    });

    body.links.push({ rel: 'index', href: env.helpers.uri('home') });

    env.response.body = body;
    next(env);
  });
};
