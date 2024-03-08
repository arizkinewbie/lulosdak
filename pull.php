<?php
$output = shell_exec('git pull origin master');
if ($output != 'Already up to date.') {
    exec('killall immortal');
    exec('killall node');
    sleep(3);
    $pid_immortal = exec('immortal -c immortal.yaml & echo $!');
    $pid_node = exec('node index.js & echo $!');
    echo "<pre>PID Immortal: $pid_immortal\nPID Node: $pid_node</pre>";
}
echo "<pre>$output</pre>";
?>