var eventSources = [
  {
    events: [
      {% for event in data.Local.Bookings %}
        {% assign groupKey = event.Resource.GroupName | Clean %}
        {% if groupKey == '' %}
          {% assign groupKey = 'resources' %}
        {% endif %}
        {% if groupKey == type or data.Local.Resource != null or type == '' %}
          {
            id: {{ event.Id }},
            resourceId: '{{ event.Resource.Id }}',
            title  : '{{ event.Resource.Name | Replace: "'", "\'" }}{% if showMemberDetails %} - {{ event.Coworker.FullName | Replace: "'", "\'" }}{% endif %}',
            startDate: '{{event.FromTime | Date: 'd'}}',
            endDate: '{{event.ToTime | Date: 'd'}}',
            startTime: '{{event.FromTime | Date: 't'}}',
            endTime: '{{event.ToTime | Date: 't'}}',
            start  : '{{event.FromTime | Date: 'yyyy' }}-{{ event.FromTime | Date: 'MM' }}-{{ event.FromTime | Date: 'dd' }}T{{ event.FromTime | Date: 'HH' }}:{{ event.FromTime | Date: 'mm' }}Z',
            end  : '{{ event.ToTime | Date: 'yyyy' }}-{{ event.ToTime  | Date: 'MM' }}-{{ event.ToTime  | Date: 'dd' }}T{{ event.ToTime  | Date: 'HH' }}:{{ event.ToTime  | Date: 'mm' }}Z',
            allDay : false,
            editable: false,
            ignoreTimezone: true,
            color: 'black'
          },
          {% for linkedResource in event.Resource.LinkedResources %}
            {
              id: {{ event.Id }},
              resourceId: '{{ linkedResource.Id }}',
              title  : '{{ linkedResource.Name | Replace: "'", "\'" }}{% if showMemberDetails %} - {{ event.Coworker.FullName | Replace: "'", "\'" }}{% endif %}',
              startDate: '{{event.FromTime | Date: 'd'}}',
              endDate: '{{event.ToTime | Date: 'd'}}',
              startTime: '{{event.FromTime | Date: 't'}}',
              endTime: '{{event.ToTime | Date: 't'}}',
              start  : '{{event.FromTime | Date: 'yyyy' }}-{{ event.FromTime | Date: 'MM' }}-{{ event.FromTime | Date: 'dd' }}T{{ event.FromTime | Date: 'HH' }}:{{ event.FromTime | Date: 'mm' }}Z',
              end  : '{{ event.ToTime | Date: 'yyyy' }}-{{ event.ToTime  | Date: 'MM' }}-{{ event.ToTime  | Date: 'dd' }}T{{ event.ToTime  | Date: 'HH' }}:{{ event.ToTime  | Date: 'mm' }}Z',
              allDay : false,
              editable: false,
              ignoreTimezone: true,
              color: getColurFromName('{{ linkedResource.Name | Replace: "'", "\'" }}')
            },
          {% endfor %}
        {% endif %}
      {% endfor %}
      {% for event in data.Local.TeamBookings %}
        {% assign groupKey = event.Resource.GroupName | Clean %}
        {% if groupKey == '' %}
          {% assign groupKey = 'resources' %}
        {% endif %}
        {% if groupKey == type or data.Local.Resource != null or type == '' %}
          {
            id: {{ event.Id }},
            resourceId: '{{ event.Resource.Id }}',
            title  : '{{ event.Resource.Name | Replace: "'", "\'" }}{% if true %} - {{ event.Coworker.FullName | Replace: "'", "\'" }}{% endif %}',
            startDate: '{{event.FromTime | Date: 'd'}}',
            endDate: '{{event.ToTime | Date: 'd'}}',
            startTime: '{{event.FromTime | Date: 't'}}',
            endTime: '{{event.ToTime | Date: 't'}}',
            start  : '{{event.FromTime | Date: 'yyyy' }}-{{ event.FromTime | Date: 'MM' }}-{{ event.FromTime | Date: 'dd' }}T{{ event.FromTime | Date: 'HH' }}:{{ event.FromTime | Date: 'mm' }}Z',
            end  : '{{ event.ToTime | Date: 'yyyy' }}-{{ event.ToTime  | Date: 'MM' }}-{{ event.ToTime  | Date: 'dd' }}T{{ event.ToTime  | Date: 'HH' }}:{{ event.ToTime  | Date: 'mm' }}Z',
            allDay : false,
            private: true,
            editable: false,
            ignoreTimezone: true,
            color: '#484848'
          },
        {% endif %}
      {% endfor %}

      {% if data.Local.ShowAll and data.Local.ShowAllBookings %}
        {% for event in data.Local.AllBookings %}
          {% assign groupKey = event.Resource.GroupName | Clean %}
          {% if groupKey == '' %}
            {% assign groupKey = 'resources' %}
          {% endif %}
          {% if groupKey == type or data.Local.Resource != null or type == '' %}
            {
              private: true,
              resourceId: {{ event.Resource.Id }},
              title  : '{{ event.Resource.Name | Replace: "'", "\'" }} {% if showMemberDetails %} - {{ event.Coworker.FullName | Replace: "'", "\'" }}{% endif %}',
              start  : '{{ event.FromTime | Date: 'yyyy' }}-{{ event.FromTime | Date: 'MM' }}-{{ event.FromTime | Date: 'dd' }}T{{ event.FromTime | Date: 'HH' }}:{{ event.FromTime | Date: 'mm' }}Z',
              end  : '{{ event.ToTime | Date: 'yyyy' }}-{{ event.ToTime  | Date: 'MM' }}-{{ event.ToTime  | Date: 'dd' }}T{{ event.ToTime  | Date: 'HH' }}:{{ event.ToTime  | Date: 'mm' }}Z',
              allDay : false,
              editable: false,
              ignoreTimezone: true,
              color: getColurFromName('{{ event.Resource.Name | Replace: "'", "\'" }}')
            },
            {% for linkedResource in event.Resource.LinkedResources %}
              {
                private: true,
                resourceId: {{ linkedResource.Id }},
                title  : '{{ linkedResource.Name | Replace: "'", "\'" }} {% if showMemberDetails %} - {{ event.Coworker.FullName | Replace: "'", "\'" }}{% endif %}',
                start  : '{{ event.FromTime | Date: 'yyyy' }}-{{ event.FromTime | Date: 'MM' }}-{{ event.FromTime | Date: 'dd' }}T{{ event.FromTime | Date: 'HH' }}:{{ event.FromTime | Date: 'mm' }}Z',
                end  : '{{ event.ToTime | Date: 'yyyy' }}-{{ event.ToTime  | Date: 'MM' }}-{{ event.ToTime  | Date: 'dd' }}T{{ event.ToTime  | Date: 'HH' }}:{{ event.ToTime  | Date: 'mm' }}Z',
                allDay : false,
                editable: false,
                ignoreTimezone: true,
                color: getColurFromName('{{ linkedResource.Name | Replace: "'", "\'" }}')
              },
            {% endfor %}
          {% endif %}
        {% endfor %}
      {% endif %}
      {% if data.Local.ShowAll %}
        {% for event in data.Local.Events %}
          {% if data.Local.Resource == null or event.Resource.Id == data.Local.Resource.Id %}
            {
              private: true,
              {% if event.HasResource %}
                resourceId: {{ event.Resource.Id }},
              {% endif %}
              url: '{% Url events, tickets, id: event.Id, title: event.Name | Clean %}',{% if event.Resource != null %}resources: {{ event.Resource.Id }},{% endif %}
              title  : '{{ event.Name | Replace: "'", "\'" }}',
              start  : '{{ event.StartDate | Date: 'yyyy' }}-{{ event.StartDate | Date: 'MM' }}-{{ event.StartDate | Date: 'dd' }}T{{ event.StartDate | Date: 'HH' }}:{{ event.StartDate | Date: 'mm' }}Z',
              end  : '{{ event.EndDate | Date: 'yyyy' }}-{{ event.EndDate | Date: 'MM' }}-{{ event.EndDate | Date: 'dd' }}T{{ event.EndDate | Date: 'HH' }}:{{ event.EndDate | Date: 'mm' }}Z',
              allDay : false,
              editable: false,
              ignoreTimezone: true,
              {% if event.Resource != null %}
                color: getColurFromName('{{ event.Resource.Name | Replace: "'", "\'" }}')
              {% endif %}
            },
          {% endif %}
        {% endfor %}
      {% endif %}
      {
        title  : 'BOT',
        start  : '1950-01-01T00:00:00',
        allDay : false // will make the time show
      }
    ]
  }
]
