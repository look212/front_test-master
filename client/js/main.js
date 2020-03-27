// 리스트 가져오기
function getUserList({page}) {
    let dbdata_key = $('#search option:selected').val(),
        searchTxt = $('#searchTxt').val();
    const size = 10;
    const params = {size, page};
    // 검색 값이 있을 경우
    if(searchTxt.trim() !== ""){
        params[dbdata_key] = searchTxt;
    }
    axios({
        method: 'post',
        url: '/api/user',
        data: params
    })
        .then(function (response) {
            // dbdata 불러와 테이블 생성
            const dbdata = response.data.data.dbdata,
            exampleK_tbody = $('#exampleK > tbody');
            exampleK_tbody.empty();
            for (let i = 0; i < dbdata.length; i++) {
                let inner_txt = "<tr><td>" + dbdata[i].id + "</td><td>" + dbdata[i].name + "</td><td>" + dbdata[i].phone + "</td><td>" + dbdata[i].gender + "</td><td>" + dbdata[i].age + "</td><td>" + dbdata[i].blood_type + "</td></tr>";
                exampleK_tbody.append(inner_txt);
            }
            drawPaging(response);
        });
}

function drawPaging(response) {
    //페이징 처리하기
    const { total, size } = response.data.data,
    list_length = Math.ceil(total / size);
    const paging = $('#paging');

    // 최초에만 페이지리스트 생성
    paging.empty();
    for (let j = 1; j <= list_length; j++) {
        let list_txt = '<button data-page=' + j + '>' + j + '</button>'
        paging.append(list_txt);
    }
}

function setEvent() {
    // 검색 기능 생성
    $('.searchBtn').click(function () {
        getUserList({
            page: 1
        });
    });
    // 페이지 클릭 이벤트 생성
    $('#paging').on('click', 'button', function () {
        data_page = $(this).data('page');
        getUserList({
            page: data_page
        });
    });
}

// 테이블에 데이터 넣기
$(function () {
    // 최초 user 10명 불러오기
    getUserList({
        page: 1
    });
    setEvent();
});

