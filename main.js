const baseUrl = 'http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle';
async function getData(){
  const url = `${baseUrl}?ServiceKey=${API_KEY}&searchYearCd=2015&siDo=11&guGun=680&type=json&numOfRows=10&pageNo=1`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log('data',data);
  drawItems(data);
  drawMarker(data);
}
getData();

const items = document.querySelector('.items')

function drawItems(getData){
  const dataItem = getData.items.item;

  dataItem.forEach((item) => {
    let li = document.createElement('li');
    items.appendChild(li);
    li.innerText = item.spot_nm;
  });
}


// 지도

var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(37.495990, 127.062479), // 지도의 중심좌표
        level: 8 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

const positions = []; // 위치 배열

function drawMarker(getData){
  const dataItem = getData.items.item;
  console.log('dataItem', dataItem);

  dataItem.forEach((item) => {
    positions.push({
      title: `${item.spot_nm}`, 
      latlng: new kakao.maps.LatLng(item.la_crd, item.lo_crd),
    })
  });

  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    
    for (var i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기
        var imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
        // 마커를 생성
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
            image : markerImage // 마커 이미지 
        });
    }

}