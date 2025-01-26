<?php

	header( 'Access-Control-Allow-Origin: *' );

    if ( isset( $_POST['doc_data'] ) ) {
        $data = $_POST['doc_data'];
        $fileName = '../json/data.js';
		
        $fh = fopen( $fileName, 'w' ) or die( 'can not open the file' );
        fwrite( $fh, $data );
        fclose( $fh );
    }

?>
