# coding: utf-8
#Spotify API client keys imports
from config import CLIENT_ID
from config import CLIENT_SECRET
from config import CLIENT_URI

import spotipy
import spotipy.util as util
import sys
import pprint

from spotipy.oauth2 import SpotifyClientCredentials
"""
Python Script to rebuild spotify playlists with specified keywords filtered out
"""
class SpotifyFilter:
    def __init__(self):
        self.sp = self.clientCredentialAuthorize()

    def clientCredentialAuthorize(self):
        #Client Credential Flow authorisation required to access publicly available data

        client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID,client_secret=CLIENT_SECRET)
        #Utilizes Client Credential Flow
        sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

        return sp

    def search(self, searchQuery):
        #Code to get the search input from the user
        #Result contains hashmap containing the search string
        result = self.sp.search(searchQuery)

        #TrackMap contains track items
        trackMap = result.get("tracks", "no tracks")

        #trackItems contains list of tracks
        trackItems = trackMap.get("items", "no tracks")

        #Iterate through the list of tracks to find each track
        for track in trackItems:
            print track.get("name", "no track")
            album = track.get("album")
            # for k, v in track.iteritems():
                # print k
            # print type(track)

        # for key, value in trackMap.iteritems() :
            # print key

    def getFeatured(self):
        fpResponse = self.sp.featured_playlists()
        print(fpResponse['message'])

        while fpResponse:
            playlists = fpResponse['playlists']
            for i, item in enumerate(playlists['items']):
                print("offset is", playlists['offset'] + i, item['name'])

                if playlists['next']:
                    fpResponse = self.sp.next(playlists)
                else:
                    fpResponse = None

    def getUserPlaylists(self, username):
        playlistResponse = self.sp.user_playlists(username)
        playlists = playlistResponse['items']
        playlistLength = len(playlists)

        print type(playlists)
        for i, playlist in enumerate(playlists):
            print("%4d %s" % (i + 1, playlist['name']))

        # while playlists:
            # for i, playlist in enumerate(playlists):
                # print("%4d %s %s" % (i + 1 + playlists['offset'], playlist['uri'],  playlist['name']))
                # tracks = playlist.get('tracks')
                # total = tracks.get('total')
            # if playlists['next']:
                # playlists = sp.next(playlists)

        return playlists

    def selectPlaylist(self, playlists, index):
        playlist = playlists[index-1]
        
        # for k, v in playlist.iteritems():
            # print k

        return playlist 

    def getPlaylistTracks(self, username, playlist_id):
        tracks = self.sp.user_playlist_tracks(username, playlist_id)
        
        return tracks
    
        # items = playlists.get('items')
        # for playlist in playlists:
            # print playlist
            # print type(playlist)
        # print type(items)
        # for k, v in playlists.iteritems():
            # print k

# print type(fpResponse)

# Code for displaying user playlists
# userPlaylists = sp.user_playlists('harryyao')

# print type(userPlaylists)

 # while userPlaylists:
    # for i, playlist in enumerate(userPlaylists['items']):
        # print("%4d %s %s" % (i + 1 + userPlaylists['offset'], playlist['uri'],  playlist['name']))
    # if userPlaylists['next']:
        # userPlaylists = sp.next(userPlaylists)
    # else:
        # userPlaylists = None


s = set()

class playlist(object):
    name = ""
    owner = ""
    songs = set()

    def __init__(self, name, owner):
        self.name = name;
        self.owner = owner


