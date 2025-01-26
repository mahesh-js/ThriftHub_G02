(function ($) {
    "use strict";


    $(function () {
        var $mainContent = $('.main--content'),
            panel_actions = {},
            panel_actions_markup = '';


        // Panel Actions: Title
        panel_actions.title = function ( $el, $this, $scope ) {
			var title = prompt(
                'Enter Panel Title:',
                $this.$parent.$parent.panel.title
            );
			
			if ( title ) {
				$this.$parent.$parent.panel.title = title;
			}
        };


        // Panel Actions: Content
        panel_actions.content = function ( $el, $this, $scope ) {
            var $target = $( $el ).parent().parent().siblings('.panel-content');

            if ( $el.innerText === 'EDIT CONTENT' ) {
                $el.innerText = 'SAVE CONTENT';

                $target.find('pre[class*="language-"]').each(function () {
                    var $t = $(this),
                        $child = $t.children('code')[0];

                    $child.removeAttribute( 'class' );
                    $child.innerHTML = $child.innerHTML.replace(/<u>/g, '&lt;u>').replace(/<\/u>/g, '&lt;/u>');
                    $child.innerHTML = $child.innerText.replace(/</g, '&lt;').replace(/&lt;u>/g, '<u>').replace(/&lt;\/u>/g, '</u>');

                    $t.attr( 'class', $t[0].className.trim() );
                    $t.siblings('.toolbar').remove();

                    if ( $t.parent('.code-toolbar').length ) $t.unwrap();
                });

                var insert_pre = function ( context ) {
                    return $.summernote.ui.button({
                        tooltip: 'Insert Pre',
                        contents: '&lt;pre&gt;',
                        container: 'body',
                        click: function () {
                            var slText = context.invoke('editor.getSelectedText'),
                                preEl = document.createElement('pre'),
                                codeEl = document.createElement('code');

                            preEl.className = prompt('Class Name', 'language-html');
                            context.invoke('editor.insertNode', preEl);
                        }
                    }).render();
                };

                var insert_code = function ( context ) {
                    return $.summernote.ui.button({
                        tooltip: 'Insert Code',
                        contents: '&lt;code&gt;',
                        container: 'body',
                        click: function () {
                            var slText = context.invoke('editor.getSelectedText'),
                                codeEl = document.createElement('code');

                            codeEl.innerText = slText;
                            context.invoke('editor.insertNode', codeEl);
                        }
                    }).render();
                };

                var insert_mark = function ( context ) {
                    return $.summernote.ui.button({
                        tooltip: 'Mark',
                        contents: '&lt;mark&gt;',
                        container: 'body',
                        click: function () {
                            context.invoke('editor.underline');
                        }
                    }).render();
                };

                $target.summernote({
                    focus: true,
                    toolbar: [
                        ['font', ['style', 'bold', 'italic', 'underline', 'strikethrough', 'color', 'fontsize', 'height', 'clear']],
                        ['elements', ['ul', 'ol', 'paragraph', 'table', 'undo', 'redo']],
                        ['media', ['link', 'picture', 'video', 'btn_pre', 'btn_code', 'btn_mark']],
                        ['extra', ['codeview', 'help']],
                    ],
                    buttons: {
                        btn_pre: insert_pre,
                        btn_code: insert_code,
                        btn_mark: insert_mark
                    },
                    callbacks: {
                        onInit: function () {
                            $target.siblings('.note-editor').find('.note-toolbar').sticky({ zIndex: 999 });
                        }
                    }
                });
            } else {
                $el.innerText = 'EDIT CONTENT';

                $this.$parent.$parent.panel.content = $target.summernote('code');
                $target.summernote('destroy');
            }
        };


        // Panel Actions: Group
        panel_actions.group = function ( $el, $this, $scope ) {
			var title = {
				group: prompt( 'Enter Group Title:', '' )
			};

            if ( title.group ) {
				title.panel = prompt( 'Enter Panel Title:', '' );
				
				if ( title.panel ) {
					$scope.doc.contents.splice(($this.$parent.$parent.$parent.$index + 1), 0, {
						title: title.group,
						contents: [
							{
								title: title.panel,
								content: ''
							}
						]
					});
				}
            }
        };


        // Panel Actions: Group Title
        panel_actions.group_title = function ( $el, $this, $scope ) {
            var title = prompt( 'Enter Group Title:', '' );

            if ( title ) {
                $scope.doc.contents[ $this.$parent.$index ].title = title;
            }
        };


        // Panel Actions: Add
        panel_actions.add = function ( $el, $this, $scope ) {
            var title = prompt( 'Enter Panel Title:', '' );

            if ( title ) {
				$this.$parent.$parent.$parent.panel.contents.splice(($this.$parent.$parent.$index + 1), 0, {
					title: title,
					content: ''
				});
            }
        };


        // Panel Actions: Delete
        panel_actions.delete = function ( $el, $this, $scope ) {
            var $parent = $this.$parent.$parent;
            
            if ( $parent.$index === 0 && $parent.$parent.panel.contents.length === 1 ) {
                if ( $parent.$parent.$index === 0 ) {
                    return;
                }
                
                $scope.doc.contents.splice( $parent.$parent.$index, 1 );
                return;
            }
            
            $parent.$parent.panel.contents.splice( $parent.$index, 1 );
        };


        // Panel Actions: Add Markup
        angular.element( document.documentElement ).scope().$apply(function ( $scope, $http ) {
            $scope.panel_btns = [
                ['Edit Title', 'btn-info', 'title'],
                ['Edit Content', 'btn-info', 'content'],
                ['Add Group', 'btn-info', 'group'],
                ['Add Panel', 'btn-info', 'add'],
                ['Delete Panel', 'btn-warning', 'delete'],
            ];


            $scope.panel_action = function ($el, $action) {
                panel_actions[ $action ]( $el, this, $scope );
				
                $.post('assets/json/save.php', {
                    doc_data: 'var docData = '+ angular.toJson( $scope.doc ) +';\n'
                });
            };
        });
    });

}(jQuery));
