import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.List;

public class MessageExchange {

    private JSONParser jsonParser = new JSONParser();

    public String getToken(int index) {
        Integer number = index * 8 + 11;
        return "TN" + number + "EN";
    }

    public int getIndex(String token) {
        return (Integer.valueOf(token.substring(2, token.length() - 2)) - 11) / 8;
    }

    public String getServerResponse(List<JSONObject> messages, String version, int size) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("messages", messages);
        jsonObject.put("token", getToken(size));
        jsonObject.put("version", version);
        return jsonObject.toJSONString();
    }

    public String getClientSendMessageRequest(String message) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", message);
        return jsonObject.toJSONString();
    }

    public String getClientMessage(InputStream inputStream) throws ParseException, IOException {
        return (String) getJSONObject(inputStreamToString(inputStream)).get("message");
    }

    public JSONObject getJSONMessage (InputStream inputStream) throws ParseException, IOException {
        return getJSONObject(inputStreamToString(inputStream));
    }

    public JSONObject getJSONObject(String json) throws ParseException {
        return (JSONObject) jsonParser.parse(json.trim());
    }

    public String getID (InputStream inputStream) throws  ParseException, IOException {
        return (String) getJSONObject(inputStreamToString(inputStream)).get("id");
    }

    public String inputStreamToString(InputStream in) throws IOException {
       		StringBuilder out = new StringBuilder();
       		BufferedReader br = new BufferedReader(new InputStreamReader(in));
       		try {
           		for (String line = br.readLine(); line != null; line = br.readLine()) {
                    out.append(line);
                }
           	} finally {
           		br.close();
           	}
       	    return out.toString();
    }
}
