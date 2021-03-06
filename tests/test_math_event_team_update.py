import unittest2
import datetime

from google.appengine.ext import ndb
from google.appengine.ext import testbed
from google.appengine.ext.webapp import Response

from consts.event_type import EventType
from controllers.cron_controller import EventTeamUpdate
from datafeeds.datafeed_usfirst import DatafeedUsfirst
from models.event import Event
from models.event_team import EventTeam
from models.match import Match
from models.team import Team


class TestDatafeedUsfirstTeams(unittest2.TestCase):
    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()

        self.event = Event(
                id="2010sc",
                name="Palmetto Regional",
                event_type_enum=EventType.REGIONAL,
                short_name="Palmetto",
                event_short="sc",
                year=2010,
                end_date=datetime.datetime(2010, 03, 27),
                official=True,
                location='Clemson, SC',
                start_date=datetime.datetime(2010, 03, 24),
        )
        self.event.put()

        self.match = Match(
            id="2010sc_qm1",
            alliances_json="""{"blue": {"score": -1, "teams": ["frc3464", "frc20", "frc1073"]}, "red": {"score": -1, "teams": ["frc69", "frc571", "frc176"]}}""",
            comp_level="qm",
            event=self.event.key,
            year=2010,
            set_number=1,
            match_number=1,
            team_key_names=[u'frc69', u'frc571', u'frc176', u'frc3464', u'frc20', u'frc1073']
        )
        self.match.put()

    def tearDown(self):
        self.testbed.deactivate()

    # def test_doEventTeamUpdate(self):
    # call EventTeamUpdate with 2010sc
    #    eventteamupdate = EventTeamUpdate()
    #    eventteamupdate.response = Response()
    #    eventteamupdate.get("2010sc")
    #
    # Teams were generated by EventTeamUpdate, make sure EventTeams
    # exist and feature Team Keys
    #
    #    event_team_from_match_one = EventTeam.get_by_id("2010sc_frc69")
    #    self.assertEqual(event_team_from_match_one.event, self.event.key)
    #    self.assertEqual(event_team_from_match_one.team, ndb.Key(Team, "frc69"))
    #
    #    event_team_from_match_two = EventTeam.get_by_id("2010sc_frc20")
    #    self.assertEqual(event_team_from_match_two.event, self.event.key)
    #    self.assertEqual(event_team_from_match_two.team, ndb.Key(Team, "frc20"))
