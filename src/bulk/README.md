Devices

- BroadWorks Communicator
  - BroadTouch Business Communicator Desktop - Audio
- Business Communicator - PC
  - BroadTouch Business Communicator Desktop
  - BroadTouch Business Communicator Desktop - Audio
- Business Communicator - Mobile
  - BroadTouch Business Communicator Mobile
  - BroadTouch Business Communicator Mobile - Audio
- Business Communicator - Tablet
  - BroadTouch Business Communicator Tablet
  - BroadTouch Business Communicator Tablet - Audio
  - BroadTouch Business Communicator Tablet - Video

Services

- Shared Call Appearance
- Shared Call Appearance 5
- Multiple Call Arrangement
- Integrated IMP
- BroadTouch Business Communicator Desktop
- BroadTouch Business Communicator Desktop - Audio
- BroadTouch Business Communicator Desktop – Video
- BroadTouch Business Communicator Mobile
- BroadTouch Business Communicator Mobile - Audio
- BroadTouch Business Communicator Tablet
- BroadTouch Business Communicator Tablet - Audio
- BroadTouch Business Communicator Tablet - Video

TEMPLATES

\*\* REPLACE {{ uconetype }} with d, m, t

Device Config:
Device Name: NW4*2BZ_London{{ extension }}*{{ uconetype }}
Device User: NW4*2BZ_London{{ extension }}*{{ uconetype }}
Device Pass: NW4*2BZ_London{{ extension }}*{{ uconetype }}

Endpoint Config
linePort: {{ userIdPrefix }}_sca_{{ uconetype }}

- create uconetype?
- move server-side parsing?
- if user exists, pull all the user data for help
