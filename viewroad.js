var markers = [];

  var overlayOn = false,
          container = document.getElementById('container'),
          mapContainer = document.getElementById('map'),
          rvContainer = document.getElementById('roadview');

  var mapCenter = new kakao.maps.LatLng(36.649552, 127.857010),
          mapOption = {
            center: mapCenter,
            level: 12 
          };

  var map = new kakao.maps.Map(mapContainer, mapOption);
  var rv = new kakao.maps.Roadview(rvContainer);
  var rvClient = new kakao.maps.RoadviewClient();

  kakao.maps.event.addListener(rv, 'position_changed', function() {

    var rvPosition = rv.getPosition();
    map.setCenter(rvPosition);

    if(overlayOn) {
      marker.setPosition(rvPosition);
    }
  });

  var markImage = new kakao.maps.MarkerImage(
          'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
          new kakao.maps.Size(26, 46),
          {  
            spriteSize: new kakao.maps.Size(1666, 168),
            spriteOrigin: new kakao.maps.Point(705, 114),
            offset: new kakao.maps.Point(13, 46)
          }
  );

  var marker = new kakao.maps.Marker({
    image : markImage,
    position: mapCenter,
    draggable: true
  });

  kakao.maps.event.addListener(marker, 'dragend', function(mouseEvent) {
    var position = marker.getPosition();
    toggleRoadview(position);
  });

  
  kakao.maps.event.addListener(map, 'click', function(mouseEvent){
    if(!overlayOn) {
      return;
    }

    var position = mouseEvent.latLng;
    marker.setPosition(position);
    toggleRoadview(position);
  });

  
  
  function toggleRoadview(position){
    rvClient.getNearestPanoId(position, 50, function(panoId) {
      if (panoId === null) {
        toggleMapWrapper(true, position);
      } else {
        toggleMapWrapper(false, position);
        rv.setPanoId(panoId, position);
      }
    });
  }

  
  function toggleMapWrapper(active, position) {
    if (active) {
      container.className = '';
      map.relayout();
      map.setCenter(position);
    } else {
      if (container.className.indexOf('view_roadview') === -1) {
        container.className = 'view_roadview';
        map.relayout();
        map.setCenter(position);
      }
    }
  }

  
  function toggleOverlay(active) {
    if (active) {
      overlayOn = true;
      map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      marker.setMap(map);
      marker.setPosition(map.getCenter());

      toggleRoadview(map.getCenter());
    } else {
      overlayOn = false;
      map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      marker.setMap(null);
    }
  }

  
  function setRoadviewRoad() {
    var control = document.getElementById('roadviewControl');
    if (control.className.indexOf('active') === -1) {
      control.className = 'active';
      toggleOverlay(true);
    } else {
      control.className = '';
      toggleOverlay(false);
    }
  }

  
  function closeRoadview() {
    var position = marker.getPosition();
    toggleMapWrapper(true, position);
  }

  
  var clusterer = new kakao.maps.MarkerClusterer({
    map: map, 
    averageCenter: true, 
    minLevel: 4 
  });

  // 데이터
  var data = [   
    [37.5758, 126.9768, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/iEt5LHAA3ny5aN7Q7">경복궁 </a><br/>'],
    [37.58, 126.9923, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/XW2jcbfaVygyXjW67">창덕궁 </a><br/>'],
    [37.5721, 126.9868, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/98PTqyLSHLUuZ3GP9">인사동거리 </a><br/>'],
    [37.551163, 126.988238, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/EVvzJocK2s1EE78DA">N서울타워 </a><br/>'],
    [37.567119, 127.008507, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/UmpfP2kZyfMniNt69">동대문디자인플라자 </a><br/>'],
    [37.512610, 127.102550, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/WJ3cNnPhgBRqpTXm7">롯데월드타워 </a><br/>'],
    [37.578769, 126.994853, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/kDUWkgz3VUDQgaTn7">창경궁 </a><br/>'],
    [37.565803, 126.975150, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/zZras4iDUUPRisN5A">덕수궁 </a><br/>'],
    [37.570780, 126.968548, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/aqPAiE4jFkVEofy98">경희궁 </a><br/>'],
    [37.511583, 127.059440, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/WFc78aaua94utCGE8">스타필드 코엑스몰 </a><br/>'],
    [37.553420, 126.923466, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/A1313zPVj1S7C4qA7">홍대거리 </a><br/>'],
    [37.400960, 126.733542, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/mox2dCRf4WXcctDn7">소래포구역 </a><br/>'],
    [37.392487, 126.639402, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/Nqw4jgWNBsozp3rcA">송도 센트럴파크 </a><br/>'],
    [37.475609, 126.617396, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.475609, 126.617396">인천 차이나타운 </a><br/>'],
    [37.743961, 127.352632, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/37YygyQbS1AMbbmbA">가평아침고요수목원 </a><br/>'],
    [37.424915, 126.864436, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/j9YAsqhcF3osfU366">광명동굴 </a><br/>'],
    [37.478018, 127.184102, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/1o4hEd8sGjpeb7jr5">남한산성 </a><br/>'],
    [37.433707, 127.011393, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/1wrJJEBNJqnW74jn8">서울대공원 </a><br/>'],
    [37.287245, 127.011588, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.287245, 127.011588">수원화성 </a><br/>'],
    [37.534321, 127.316054, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/CHnrJXd6yAZ9mej27">양평 두물머리 </a><br/>'],
    [37.291044, 127.202976, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/pnCz7gnPh4H4oxJS9">에버랜드 </a><br/>'],
    [37.891394, 126.740514, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/UwQqFcR9KCv2ek4o6">파주DMZ </a><br/>'],
    [37.796428, 128.917224, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.796428, 128.917224">강릉커피거리 </a><br/>'],
    [37.791733, 127.525774, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/E5bDzkxuWwkkbj1u8">남이섬 </a><br/>'],
    [37.690678, 128.751223, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/d9RbmFyNhn5tixSn6">대관령 </a><br/>'],
    [37.325833, 129.021030, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/DZRgWJQgYobKv5BP6">삼척 대이리 동굴지대 </a><br/>'],
    [38.119513, 128.465616, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/KfdrwAf1S4ZC4bki7">설악산 </a><br/>'],
    [37.797529, 128.544304, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/TThdUDZ7NazXDNkL8">오대산 상원사 </a><br/>'],
    [37.996460, 128.200571, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/DMnxU6TyhUJ5Wiea6">인제 원대리 자작나무 숲 </a><br/>'],
    [37.210702, 128.827193, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.210702, 128.827193">정선 하이원 리조트 </a><br/>'],
    [37.891055, 128.827763, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.891055, 128.827763">주문진 수산시장 </a><br/>'],
    [36.461168, 127.112895, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/CZNykfALkR34cfVd9">무령왕릉 </a><br/>'],
    [36.755879, 127.836201, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/BhWqCq36Dk9p8k3AA">괴산 산막이 옛길 </a><br/>'],
    [37.003346, 128.343746, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/7LfVLQp6cpHj3puM6">단양 팔경 </a><br/>'],
    [36.406526, 127.438700, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.406526, 127.438700">계족산 황톳길 </a><br/>'],
    [36.305596, 126.516042, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.305596, 126.516042">대천해수욕장 </a><br/>'],
    [36.284451, 126.912779, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/q4QZZFF2nGNEc2bk7">부여관북리백제유적 </a><br/>'],
    [36.001019, 127.057497, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.001019, 127.057497">서동공원 </a><br/>'],
    [36.292054, 126.911434, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/KSTsw8k4HWeFyzqx5">낙화암 </a><br/>'],
    [36.035685, 126.718830, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/u9Z4MEL9UUNXjiwaA">국립생태원 </a><br/>'],
    [36.579047, 126.314035, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.579047, 126.314035">안면도 해수욕장 </a><br/>'],
    [34.744679, 128.663139, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/ypiJVyxHwWKvSvAVA">바람의 언덕 </a><br/>'],
    [34.769230, 128.711745, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/QXLRJ1xDb1vXZHo89">보타니아 </a><br/>'],
    [35.790092, 129.332071, '<div style="padding: 5px"><a target="_blank" href="http://kko.to/-9_QizGIV">불국사 </a><br/>'],
    [36.116785, 128.004084, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.116785, 128.004084">김천 직지사 </a><br/>'],
    [35.837925, 129.212490, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/CWvTGZCtv8Ju5AF2A">대릉원 </a><br/>'],
    [34.800798, 128.038189, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/rRqB6mBZb4Zygef16">독일 마을 </a><br/>'],
    [34.727584, 127.894119, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/gUp7Hd1FVffm9YAR6">다랭이 마을 </a><br/>'],
    [34.932301, 127.898086, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/34.932301, 127.898086">양때 목장 </a><br/>'],
    [34.752059, 127.983227, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/1Swm1fAvB4hSgGcq9">보리암 </a><br/>'],
    [35.861658, 128.607018, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/35.861658, 128.607018">방천시장 </a><br/>'],
    [35.868575, 128.580341, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/35.868575, 128.580341">서문시장 </a><br/>'],
    [35.097386, 129.010576, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/gyq15qB1E6Jhpnvi7">김천문화마을 </a><br/>'],                        
    [35.156092, 129.152054, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/wd7VW94JzrHQpLoF6">더베이101 </a><br/>'],
    [36.538635, 128.518638, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/y6qmXWy1yqe4KipbA">안동하회마을 </a><br/>'],
    [36.034763, 129.380456, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.034763, 129.380456">송도해수욕장 </a><br/>'],
    [37.241894, 131.865147, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.241894, 131.865147">서도 </a><br/>'],
    [36.998551, 128.686993, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.998551, 128.686993">영주 부석사 </a><br/>'],
    [35.547323, 129.044412, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/kFS9VHRZB7CVkSMv8">간월재 </a><br/>'],
    [35.546117, 129.295630, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/CjZsuMPpHCYzhinf8">태화강 십리대숲 </a><br/>'],
    [37.020704, 129.254890, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/hpy3ZBZKQ7FuqHcn9">금강소나무숲길 </a><br/>'],
    [35.096704, 129.030497, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/35.096704, 129.030497">자갈치시장 </a><br/>'],
    // [35.189018, 128.078000, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/QkcFY8CMAFFCQq1CA">진주성 </a><br/>'],
    [35.549789, 128.411991, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/vJmhsoVMa4A2wa6v8">우포늪 </a><br/>'],
    [36.388180, 129.166533, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/vBER1nsuehLinyicA">주왕산 </a><br/>'],
    [35.053038, 129.087182, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/P5owAdDXn3KsUu7f6">태종대 </a><br/>'],
    [35.945612, 128.644748, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/35.945612, 128.644748">팔공산 올레길 </a><br/>'],
    [35.801189, 128.098016, '<div style="padding: 5px"><a target="_blank" href="https://www.google.com/maps/@35.8011197,128.0980892,3a,75y,341.96h,90.13t/data=!3m8!1e1!3m6!1sAF1QipPV5N_T0aUB2KPwNWvXoCbhJIUyfvxH4EYsJHY_!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPV5N_T0aUB2KPwNWvXoCbhJIUyfvxH4EYsJHY_%3Dw203-h100-k-no-pi-0-ya141.1414-ro-0-fo100!7i10240!8i5120">해인사 </a><br/>'],
    [35.158656, 129.160345, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/35.158656, 129.160345">해운대 해수욕장 </a><br/>'],
    [34.533883, 126.781268, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/M63UjM1xQyzznVkA6">가우도 </a><br/>'],
    // [35.276028, 127.310038, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/WXJ6pVbpJtt3jAud6">섬진강 기차마을 </a><br/>'],
    [35.140304, 126.915630, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/w44BNdJwH9dhe5wk7">양림동 근대문화유산 </a><br/>'],
    [35.184224, 127.012569, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/U7VkD6N1hZUGguCg9">소쇄원 </a><br/>'],
    [35.219300, 126.996456, '<div style="padding: 5px"><a target="_blank" href="https://www.google.com/maps/@35.2195625,126.9962311,3a,75y,324.59h,90t/data=!3m8!1e1!3m6!1sAF1QipNWzdTs6kJ9BOWDUrmrY86LV99Ach03NU3TPDeO!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNWzdTs6kJ9BOWDUrmrY86LV99Ach03NU3TPDeO%3Dw203-h100-k-no-pi-0-ya341.85464-ro-0-fo100!7i7168!8i3584">명옥헌 </a><br/>'],
    [35.323685, 127.004131, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/krokEptDwEgpEJCh6">메타세쿼이아가로수길 </a><br/>'],
    [35.326627, 126.985394, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/WEFDq3ZR1mooo5Zk8">죽녹원 </a><br/>'],
    [35.134067, 126.988740, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/shRkp3q7jqMfd2jRA">무등산 </a><br/>'],
    [36.004326, 127.778579, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.004326, 127.778579">무주 태권도원 </a><br/>'],
    [34.719795, 127.082095, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/kNAgntv4TP4S1jNSA">보성 한국차박물관 </a><br/>'],
    [34.885402, 127.509523, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/34.885402, 127.509523">순천만생태공원 </a><br/>'],
    [35.814698, 127.152634, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/jYFyjksUZeteam9e9">전주 한옥마을 </a><br/>'],
    [35.493437, 126.928080, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/Tz33M6ZntKDG5zi36">내장산 국립공원 </a><br/>'],
    [35.762101, 127.404831, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/aap4bXCHozL4mWTx7">진안 마이산 </a><br/>'],
    [34.382871, 126.577442, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/BqLmTfoBcjxSSyKGA">해남 미황사 </a><br/>'],
    [33.484272, 126.806475, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/33.484272, 126.806475">비자림 </a><br/>'],
    [33.250071, 126.563705, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/33.250071, 126.563705">매일올레시장 </a><br/>'],
    [33.424212, 126.931103, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/33.424212, 126.931103">섭지코지 </a><br/>'],
    [33.458010, 126.942531, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/DaPb8qibifVC4isu7">성산 일출봉 </a><br/>'],
    [33.386342, 126.799700, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/33.386342, 126.799700">성읍 민속마을 </a><br/>'],
    [33.395694, 126.585407, '<div style="padding: 5px"><p>올레길 코스: </p><a target="_blank" href="http://www.jejuolle.org/trail/kor/">제주도 올레길</a><br/>'],
    [33.504293, 126.954106, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/8Mc4orAytBTNNCDM7">우도 </a><br/>'],
    [33.439330, 126.629672, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/33.439330, 126.629672">절물자연휴양림 </a><br/>'],
    [33.395069, 126.684782, '<div style="padding: 5px"><p>한라산 둘레길: </p><a target="_blank" href="http://hallatrail.or.kr/">한라산 둘레길 </a><br/>'],
    [37.536421, 126.977142, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/eBeFHDXFiaDYdiUE8">전쟁 기념관 </a><br/>'],
    [37.523607, 126.980393, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.523607, 126.980393">국립중앙박물관 </a><br/>'],
    [37.514831, 127.057280, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.514831, 127.057280">봉은사 </a><br/>'],
    [37.563369, 126.987212, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.563369, 126.987212">명동성당 </a><br/>'],
    [37.565592, 126.977967, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.565592, 126.977967">서울 광장 </a><br/>'],
    [37.578991, 126.986411, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/KQaqN7LH5WH27CBn7">북촌 한옥마을 </a><br/>'],
    [37.956081, 126.676668, '<div style="padding: 5px"><a target="_blank" href="https://www.panmuntour.go.kr/nlgn/pblc/guidance/panmunjomIntrcn.do">판문점 자유의 집 </a><br/>'],
    [35.531936, 128.553447, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/eea8G5Xwxt4opz5o9">관룡사 </a><br/>'],
    [35.822134, 128.116134, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/4Mauyw8ieUNznNeu6">가야산 </a><br/>'],
    [36.766302, 127.747693, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.766302, 127.747693">문광저수지은행길 </a><br/>'],
    [36.548945, 128.527700, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.548945, 128.527700">하회세계탈박물관 </a><br/>'],
    [36.350156, 129.276255, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/125wtYFg3msANBEL6">산성계곡 생태공원 </a><br/>'],
    [34.885924, 127.509176, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/nF9pNgFE4jpiByHVA">순천만 습지 </a><br/>'],
    [34.292399, 126.523966, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/FrhrrUA1wjFVbE1BA">땅끝마을 </a><br/>'],
    [37.488690, 130.912956, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/2GZRcRpuXHMD1mRt8">독도일출전망대 </a><br/>'],
    [37.499510, 130.883476, '<div style="padding: 5px"><a target="_blank" href="https://goo.gl/maps/U3cxLgiXcw1vsyRX6">봉래폭포 </a><br/>'],
    [37.240032, 131.869353, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/37.240032, 131.869353">동도 </a><br/>'],
    [38.576331, 128.382538, '<div style="padding: 5px"><a target="_blank" href="https://www.google.com/maps/@38.576394,128.3825602,3a,75y,88.04h,84.41t/data=!3m8!1e1!3m6!1sAF1QipPwblhaRDx9SZ02ycRZCVtVe2yim6Cqb9wkrzd0!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPwblhaRDx9SZ02ycRZCVtVe2yim6Cqb9wkrzd0%3Dw203-h100-k-no-pi-0-ya122.93372-ro-0-fo100!7i5472!8i2736">DMZ박물관 </a><br/>'],
    [36.0282, 126.7489, '<div style="padding: 5px"><a target="_blank" href="https://map.kakao.com/link/roadview/36.0282, 126.7489">금강산생태공원 </a><br/>'],
    [37.556649, 126.970545, '<div style="padding: 5px"><a target="_blank" href="https://www.google.com/maps/@37.5567075,126.9706905,3a,75y,255.89h,71.32t/data=!3m6!1e1!3m4!1sJGMBvN2E-R70_hTCO5t2Kg!2e0!7i13312!8i6656">서울로7017 </a><br/>'],
    [37.475321, 126.597901, '<div style="padding: 5px"><a target="_blank" href="https://www.google.com/maps/@37.4724007,126.6025543,3a,82.3y,208.1h,93.9t/data=!3m8!1e1!3m6!1sAF1QipO4JLpQb6l1OIYwIk_T-VtbpVkQ2zSpx8heWHVE!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipO4JLpQb6l1OIYwIk_T-VtbpVkQ2zSpx8heWHVE%3Dw203-h100-k-no-pi-0-ya220.50041-ro0-fo100!7i8000!8i4000">월미도 </a><br/>'],
    [38.586660, 128.375220, '<div style="padding: 5px"><a target="_blank" href="https://www.google.com/maps/@38.5864731,128.375472,3a,75y,110.64h,82.5t/data=!3m8!1e1!3m6!1sAF1QipMmNPx-s8WaPjQNkerXQK0xTs7vTv9Qii5j_xf-!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMmNPx-s8WaPjQNkerXQK0xTs7vTv9Qii5j_xf-%3Dw203-h100-k-no-pi-0-ya153.66354-ro0-fo100!7i11264!8i5632">고성통일전망대 </a><br/>'],
    [36.977843, 128.339782, '<div style="padding: 5px"><a target="_blank" href="https://www.google.com/maps/@36.9767151,128.339376,3a,75y,103.77h,59.44t/data=!3m8!1e1!3m6!1sAF1QipMEobwWsI2FujOi2rnJebrWmiUWOkRwjW7UyMAb!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMEobwWsI2FujOi2rnJebrWmiUWOkRwjW7UyMAb%3Dw203-h100-k-no-pi1.4733607-ya262.6013-ro-2.0271637-fo100!7i5376!8i2688">단양 잔도 </a><br/>']
  ];
  for (var i=0; i < data.length; i++){ 
    
    var marker1 = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(data[i][0], data[i][1]), 
      map: map 
    });
    var infowindow = new kakao.maps.InfoWindow({
      content : data[i][2]
    });
    markers.push(marker1);

    kakao.maps.event.addListener(marker1, 'click', makeOverListener(map, marker1, infowindow));
    kakao.maps.event.addListener(marker1, 'mouseover', makeOutListener(infowindow));
  }
  clusterer.addMarkers(markers);

  
  function makeOverListener(map, marker, infowindow) {
    return function() {
      infowindow.open(map, marker);
    };
  }

  
  function makeOutListener(infowindow) {
    return function() {
      infowindow.close();
    };
  }