myApp
.factory('ListModel', [

function (){
    var ListModel = {
        lists: [
            {
                id: 0,
                title: 'This is list 0',
                content: 'This is the content'
            },
            {
                id: 1,
                title: 'This is list 1',
                content: 'This is the content of list 1'
            },
            {
                id: 2,
                title: 'This is list 2',
                content: 'This is the content of list 2'
            }
        ],
        currentItem: {},
        moreData: false 
    };

    return ListModel;
}]);