<?php
$html = file_get_contents('https://techynews.lat');
preg_match('/data-page="(.*?)"/', $html, $matches);
if(isset($matches[1])) {
    $json = html_entity_decode($matches[1], ENT_QUOTES, 'UTF-8');
    file_put_contents('payload.json', $json);
    echo "Saved to payload.json\n";
} else {
    echo "Not found\n";
}
