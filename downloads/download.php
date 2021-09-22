<? // Code to track the file using PHP, whether that means storing data in a database, saving to a log, or emailing you. I'd use a DB, like so:

   // Prep the vars
   $file_id = $_GET['file_id']; // You should sanitize this first.
   $file_path = '/files/'.$file_id.'.pdf';

   // Save data to database
   mysql_query('INSERT INTO download_log
      SET file_id = '.$file_id.',
          date_downloaded = '.date('Y-m-d H:i:s').',
          user_id = '.$_SESSION['user_id']);

   // Now find the file and download it
   header('Content-type: application/pdf');
   header('Content-Disposition: attachment; filename='.$file_id.'.pdf); // or whatever the file name is
   readfile($file_path);
