<?php
$content = file_get_contents('app/Console/Commands/SyncSocialBacklog.php');

$content = str_replace(
    "\$fbResult = \$socialMedia->postToFacebook(\$article);",
    "\$fbResult = \$socialMedia->postToFacebook(\$article);\n            \$liResult = \$socialMedia->postToLinkedIn(\$article);",
    $content
);

$content = str_replace(
    "if (\$twitterResult || \$fbResult) {",
    "if (\$twitterResult || \$fbResult || \$liResult) {",
    $content
);

$content = str_replace(
    "| FB: \" . (\$fbResult ? 'Yes' : 'No') . \")\");",
    "| FB: \" . (\$fbResult ? 'Yes' : 'No') . \" | LI: \" . (\$liResult ? 'Yes' : 'No') . \")\");",
    $content
);

$content = str_replace(
    "\$this->error(\"   ❌ Post failed on both networks",
    "\$this->error(\"   ❌ Post failed on all networks",
    $content
);

file_put_contents('app/Console/Commands/SyncSocialBacklog.php', $content);
echo "Patched successfully\n";
