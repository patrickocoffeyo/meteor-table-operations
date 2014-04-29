(function($) {

  $.fn.tableOperations = function(options) {
    var $table = $(this),
        $form,
        $select,
        defaults = {
          defaultSelect: 'Select',
          selectClass: 'form-control',
          buttonClass: 'btn btn-default',
          formClass: 'form-inline',
          buttonText: 'Go',
          operations: {
            test: { label: 'Test Me', callback: function(selected) { console.log(selected); }  }
          }
        };

    options = $.extend({}, defaults, options);

    //Add the checkbox tds
    if ($table.find('thead').length <= 0) { $table.prepend('<thead><tr></tr></thead>'); }

    if ($table.find('tbody tr .batch-select-check').length <= 0) {
      $table.find('tbody tr').prepend('<td class="batch-select-check"><input type="checkbox"/></td>');
    }

    if ($table.find('thead tr .batch-select-check-all').length <= 0) {
      $table.find('thead tr').prepend('<td class="batch-select-check-all"><input type="checkbox"/></td>');
    }

    //Add the operations selector box
    $form = $table.prev('form#batch-select-operation-form');
    if ($form.length <= 0) {
      $table.before('<form id="batch-select-operation-form" class="'+options.formClass+'" role="form"><div class="form-group"><select class="'+options.selectClass+'"><option>'+options.defaultSelect+'</option></select></div><div class="form-group"><button type="submit" class="'+options.buttonClass+'">'+options.buttonText+'</button></div>');
      $form = $table.prev('form#batch-select-operation-form');
      $select = $form.find('select');
      $.each(options.operations, function(index, item) { $select.append('<option value="'+index+'">'+item.label+'</option>'); });
    }

    //check all
    $table.find('.batch-select-check-all input').on('click', function() {
      $table.find('td.batch-select-check input').prop('checked', $(this).prop('checked') );
    });

    //Form submition actions
    $form.on('submit', function(e) {
      e.preventDefault();
      var val = $(this).find('select').val(),
          $selected = $table.find('.batch-select-check input:checked').closest('tr');

      if (val != options.defaultSelect && $selected.length > 0) { options.operations[val].callback($selected); }
    });

  };

})(jQuery);
