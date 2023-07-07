$("#add_user").submit(function(event){
    alert("Data inserted successfully!")
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
    var data = {}

    $.map(unindexed_array,function(n ,i){
        data[n['name']]= n['value']
    })

    console.log(data);
    var request = {
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated successfully!")

    })

})


// delete
// if(window.location.pathname == "/"){
//     $ondelete = $(".table tbody td a.delete");
//     $ondelete.click(function(){
//         var id =$(this).attr("data-id")

//         var request = {
//             "url":`http://localhost:3000/api/users/${id}`,
//             "method":"DELETE"
//         }
//         if(confirm("Do you really want to delete this record")){
//             $.ajax(request).done(function(response){
//                 alert("Data Deleted successfully!");
//                 location.reload()       
//             })
//         }
//     })
// }
$(document).ready(function() {
    // Attach click event listener to delete buttons
    $('.delete-btn').on('click', function() {
      const id = $(this).data('id');
      if(confirm('Do you want to delete this record?')){
          $.ajax({
                url: '/api/users/' + id,
                method: 'DELETE',
               
                success: function(result) {
                  alert('Data Deleted Successfully');
                  location.reload();
                },
                error: function(err) {
                  console.error(err);
                }
              });
      }
      });
    });