package juice;

import java.util.Comparator;

public class ComponentComparator implements Comparator <Juice> {
        @Override
        public int compare (Juice first, Juice second) {
            return first.getComponents().size() - second.getComponents().size();
        }
}
