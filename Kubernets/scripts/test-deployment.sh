#!/bin/bash
sleep_time=5
max_tries=5
tries=0
success=1

while [ "$success" != 0 ] && [ "$tries" -lt "$max_tries" ]
do

    tries=$((tries+1))
    echo "Starting try $tries"

    kubectl_output=$(kubectl get pods)
    runnings_pods=$(echo "$kubectl_output" | grep -c "Running")
    output_lines=$[$(echo "$kubectl_output" | wc -l) - 1]

    #success="$( [[ $runnings_pods == $output_lines ]]; echo $? )"
    if [[ $runnings_pods == $output_lines ]]; then
        success=0
        echo "Ok"
    elif [[ $runnings_pods != $output_lines ]] && [ "$tries" -lt "$max_tries" ]; then
        success=1
        sleep_time=$((sleep_time*tries))
        echo "$kubectl_output"
        echo "Sleep for $sleep $sleep_time s"
        sleep $sleep_time
    else 
        success=1
        echo "Fail"
    fi

done

exit $success
