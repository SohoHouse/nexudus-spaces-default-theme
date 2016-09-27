var vm = new Vue({
  el: '#mini-calendar',
  data: {
    bookings: bookingsJson.concat(eventsJson),
    currentDate: moment().date(1).toDate(),
    activeDate: moment().toDate()
  },
  computed: {
    dayHeaders: function () {
      var days = moment.weekdays();
      days.push(days.shift());
      return days.map(function (d) {
        return d[0];
      });
    },
    displayPrev: function () {
      return this.currentMoment.isAfter( moment(), 'month')
    },
    currentMoment: {
      get: function () {
        return moment(this.currentDate);
      },
      set: function (newMoment) {
        this.currentDate = newMoment.toDate();
      }
    },
    activeMoment: {
      get: function () {
        return moment(this.activeDate);
      },
      set: function (newMoment) {
        this.activeDate = newMoment.toDate();
      }
    },
    events: function () {
      var evs = {};
      this.bookings.forEach(function (ev) {
        var formatted = moment(ev.FromTime || ev.StartDate).format('YYYY-MM-DD');
        if (!evs[formatted]) evs[formatted] = [];
        evs[formatted].push(ev);
      });
      return evs;
    },
    weeks: function () {
      var date = this.currentMoment,
          basic = date.monthWeeks().map(function (w) { 
            return date.clone().date(w.begin); 
          });
      return basic.map(function (w) {
        var runner = w.trueWeek().begin,
          end = runner.clone().endOf('isoweek'),
          week = [];
        while (runner.isBefore(end)) {
          week.push(runner.clone());
          runner.add(1, 'day');
        }
        return week;
      });
    }
  },
  methods: {
    eventsOn: function (day) {
      return this.events[day.format('YYYY-MM-DD')];
    },
    linkFor: function (ev) {
      return ev.TicketsPage || '/en/bookings?showall=false&view=agendaWeek&date=' + moment(ev.FromTime || ev.StartDate).utc().format('YYYY-MM-DD');
    },
    timesFor: function (ev) {
      var start = moment(ev.FromTime || ev.StartDate).utc(),
          end = moment(ev.ToTime || ev.EndDate).utc();
      return start.format('HH:mm') + ' - ' + end.format('HH:mm');
    },
    sortEvents: function (a, b) {
      return moment(a.FromTime) - moment(b.FromTime);
    },
    classFor: function (day) {
      return {
        minor: !day.isSame(this.currentMoment, 'month'),
        today: day.isSame(moment(), 'day'),
        active: day.isSame(this.activeMoment, 'date')
      };
    },
    dotClassFor: function(ev) {
      if (!ev.Coworker) return 'alternate';
    }
  }
});
