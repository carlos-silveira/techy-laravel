<?php
echo "Scanning for PHP binaries...\n";
$paths = [
    '/opt/cpanel/ea-php82/root/usr/bin/php',
    '/opt/cpanel/ea-php83/root/usr/bin/php',
    '/opt/cpanel/ea-php84/root/usr/bin/php',
    '/usr/local/bin/php',
    '/usr/bin/php'
];

foreach ($paths as $path) {
    if (file_exists($path)) {
        echo "FOUND: $path (" . shell_exec("$path -v | head -n 1") . ")\n";
    } else {
        echo "MISSING: $path\n";
    }
}
?>
